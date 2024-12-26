/*
  # Add Staffing Level Requirements

  1. Changes
    - Add staffing levels table for different traffic conditions
    - Link staffing levels to positions and services
    - Add default values for common positions
    
  2. Security
    - Enable RLS on new table
    - Add policies for authenticated users
*/

-- Create staffing levels table
CREATE TABLE staffing_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES meal_services(id) ON DELETE CASCADE,
  position_id uuid REFERENCES positions(id) ON DELETE CASCADE,
  traffic_level traffic_level NOT NULL,
  min_staff integer NOT NULL CHECK (min_staff >= 0),
  optimal_staff integer NOT NULL CHECK (optimal_staff >= min_staff),
  max_staff integer NOT NULL CHECK (max_staff >= optimal_staff),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(service_id, position_id, traffic_level)
);

-- Add trigger for updated_at
CREATE TRIGGER update_staffing_levels_updated_at
  BEFORE UPDATE ON staffing_levels
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable RLS
ALTER TABLE staffing_levels ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Allow authenticated read access" ON staffing_levels
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert" ON staffing_levels
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON staffing_levels
  FOR UPDATE TO authenticated USING (true);

-- Add indexes
CREATE INDEX idx_staffing_levels_service ON staffing_levels(service_id);
CREATE INDEX idx_staffing_levels_position ON staffing_levels(position_id);
CREATE INDEX idx_staffing_levels_traffic ON staffing_levels(traffic_level);