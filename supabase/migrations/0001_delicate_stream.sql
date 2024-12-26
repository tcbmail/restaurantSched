/*
  # Initial Schema Setup for Restaurant Scheduler

  1. Tables
    - restaurant_settings: Store restaurant configuration
    - employees: Store employee information
    - available_hours: Employee availability
    - preferred_hours: Employee schedule preferences
    - time_off_requests: Employee time off management
    - positions: Job positions and requirements
    - opening_hours: Restaurant operating hours
    - capabilities: Employee skills and certifications

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Restaurant Settings
CREATE TABLE restaurant_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Positions
CREATE TABLE positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  requires_lead boolean DEFAULT false,
  min_employees integer DEFAULT 1,
  max_employees integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- Opening Hours
CREATE TABLE opening_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week smallint NOT NULL,
  open_time time NOT NULL,
  close_time time NOT NULL,
  expected_busyness smallint DEFAULT 50,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_day CHECK (day_of_week BETWEEN 0 AND 6),
  CONSTRAINT valid_busyness CHECK (expected_busyness BETWEEN 0 AND 100)
);

-- Employees
CREATE TABLE employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  position_id uuid REFERENCES positions(id),
  hourly_rate decimal(10,2) NOT NULL,
  is_full_time boolean DEFAULT false,
  is_lead boolean DEFAULT false,
  keep_regular_schedule boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Available Hours
CREATE TABLE available_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  day_of_week smallint NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_day CHECK (day_of_week BETWEEN 0 AND 6)
);

-- Preferred Hours
CREATE TABLE preferred_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  day_of_week smallint NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_day CHECK (day_of_week BETWEEN 0 AND 6)
);

-- Time Off Requests
CREATE TABLE time_off_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text DEFAULT 'pending',
  reason text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Capabilities
CREATE TABLE capabilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Employee Capabilities
CREATE TABLE employee_capabilities (
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  capability_id uuid REFERENCES capabilities(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (employee_id, capability_id)
);

-- Enable RLS
ALTER TABLE restaurant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE opening_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE available_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE preferred_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_off_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_capabilities ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow authenticated read access" ON restaurant_settings
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON positions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON opening_hours
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON employees
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON available_hours
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON preferred_hours
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON time_off_requests
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON capabilities
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON employee_capabilities
  FOR SELECT TO authenticated USING (true);