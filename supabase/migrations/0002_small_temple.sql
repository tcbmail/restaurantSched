/*
  # Enhanced Restaurant Settings Schema

  1. New Tables
    - `meal_services`: Stores breakfast, lunch, dinner service configurations
      - `id` (uuid, primary key)
      - `restaurant_id` (uuid, references restaurant_settings)
      - `service_type` (enum: breakfast, lunch, dinner)
      - `is_active` (boolean)
      - `start_time` (time)
      - `end_time` (time)
      - `peak_start` (time)
      - `peak_end` (time)
      - `expected_traffic` (enum: low, medium, high)
      
    - `staffing_requirements`: Stores staffing needs per service
      - `id` (uuid, primary key)
      - `service_id` (uuid, references meal_services)
      - `position_id` (uuid, references positions)
      - `min_staff` (integer)
      - `optimal_staff` (integer)
      - `max_staff` (integer)

    - `holidays`: Stores holiday configurations
      - `id` (uuid, primary key)
      - `restaurant_id` (uuid, references restaurant_settings)
      - `name` (text)
      - `date` (date)
      - `status` (enum: closed, limited, normal)
      - `modified_open` (time)
      - `modified_close` (time)
      - `notes` (text)

  2. Modified Tables
    - `restaurant_settings`: Added description field
    - `positions`: Added certification requirements

  3. Security
    - Enable RLS on all new tables
    - Add policies for authenticated access
*/

-- Create service type enum
CREATE TYPE service_type AS ENUM ('breakfast', 'lunch', 'dinner');
CREATE TYPE traffic_level AS ENUM ('low', 'medium', 'high');
CREATE TYPE holiday_status AS ENUM ('closed', 'limited', 'normal');

-- Add description to restaurant settings
ALTER TABLE restaurant_settings 
ADD COLUMN description text;

-- Create meal services table
CREATE TABLE meal_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid REFERENCES restaurant_settings(id) ON DELETE CASCADE,
  service_type service_type NOT NULL,
  is_active boolean DEFAULT true,
  start_time time NOT NULL,
  end_time time NOT NULL,
  peak_start time,
  peak_end time,
  expected_traffic traffic_level DEFAULT 'medium',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(restaurant_id, service_type)
);

-- Create staffing requirements table
CREATE TABLE staffing_requirements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES meal_services(id) ON DELETE CASCADE,
  position_id uuid REFERENCES positions(id) ON DELETE CASCADE,
  min_staff integer NOT NULL CHECK (min_staff >= 0),
  optimal_staff integer NOT NULL CHECK (optimal_staff >= min_staff),
  max_staff integer NOT NULL CHECK (max_staff >= optimal_staff),
  created_at timestamptz DEFAULT now(),
  UNIQUE(service_id, position_id)
);

-- Create holidays table
CREATE TABLE holidays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid REFERENCES restaurant_settings(id) ON DELETE CASCADE,
  name text NOT NULL,
  date date NOT NULL,
  status holiday_status DEFAULT 'closed',
  modified_open time,
  modified_close time,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add certification requirements to positions
ALTER TABLE positions
ADD COLUMN requires_food_safety_cert boolean DEFAULT false;

-- Enable RLS
ALTER TABLE meal_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE staffing_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE holidays ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated read access" ON meal_services
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON staffing_requirements
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON holidays
  FOR SELECT TO authenticated USING (true);

-- Create indexes for better query performance
CREATE INDEX idx_meal_services_restaurant ON meal_services(restaurant_id);
CREATE INDEX idx_staffing_requirements_service ON staffing_requirements(service_id);
CREATE INDEX idx_holidays_restaurant ON holidays(restaurant_id);
CREATE INDEX idx_holidays_date ON holidays(date);

-- Add triggers to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_meal_services_updated_at
  BEFORE UPDATE ON meal_services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_holidays_updated_at
  BEFORE UPDATE ON holidays
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();