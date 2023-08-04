-- Tables
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    rrule TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NULL
);
CREATE TABLE subtasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    task_id UUID NOT NULL REFERENCES tasks (id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NULL
);
CREATE TABLE completed_tasks (
    PRIMARY KEY (task_id, completion_date, user_id),
    task_id UUID NOT NULL REFERENCES tasks (id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    completion_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);
CREATE TABLE completed_subtasks (
    PRIMARY KEY (subtask_id, completion_date, user_id),
    subtask_id UUID NOT NULL REFERENCES subtasks (id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    completion_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);
-- Enable Row Level Security (RLS)
alter table tasks enable row level security;
alter table subtasks enable row level security;
alter table completed_tasks enable row level security;
alter table completed_subtasks enable row level security;
--- RLS policies
CREATE POLICY "tasks user access policy" ON "public"."tasks" FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "subtasks user access policy" ON "public"."subtasks" FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "completed tasks user access policy" ON "public"."completed_tasks" AS PERMISSIVE FOR
SELECT TO public USING (auth.uid() = user_id);
CREATE POLICY "completed subtasks user access policy" ON "public"."completed_subtasks" AS PERMISSIVE FOR
SELECT TO public USING (auth.uid() = user_id);
-- Triggers
-- Automatically update tasks updated_at column.
CREATE OR REPLACE FUNCTION update_tasks_updated_at() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER tasks_update_trigger BEFORE
UPDATE ON tasks FOR EACH ROW
    WHEN (
        OLD.name IS DISTINCT
        FROM NEW.name
    ) EXECUTE FUNCTION update_tasks_updated_at();
-- Automatically update subtasks updated_at column.
CREATE OR REPLACE FUNCTION update_subtasks_updated_at() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER subtasks_update_trigger BEFORE
UPDATE ON subtasks FOR EACH ROW
    WHEN (
        OLD.name IS DISTINCT
        FROM NEW.name
    ) EXECUTE FUNCTION update_subtasks_updated_at();