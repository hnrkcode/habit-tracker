INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at
  )
VALUES (
    '00000000-0000-0000-0000-000000000000',
    '185f2f83-d63a-4c9b-b4a0-7e4a885799e2',
    'authenticated',
    'authenticated',
    'user1@email.com',
    '$2a$10$fHyug2so27rc6jA9sDazVe285/4Dh6JqVRJYtUqm4PCbEbYap19a6',
    '2023-04-22 13:10:31.463703+00',
    NULL,
    '',
    NULL,
    '',
    '2023-04-22 13:10:03.275387+00',
    '',
    '',
    NULL,
    '2023-04-22 13:10:31.458239+00',
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    NULL,
    '2022-10-04 03:41:27.391146+00',
    '2023-04-22 13:10:31.463703+00',
    NULL,
    NULL,
    '',
    '',
    NULL,
    '',
    0,
    NULL,
    '',
    NULL
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    'c182a6c2-7d04-44bf-ad5b-70992f3f22fa',
    'authenticated',
    'authenticated',
    'user2@email.com',
    '$2a$10$fHyug2so27rc6jA9sDazVe285/4Dh6JqVRJYtUqm4PCbEbYap19a6',
    '2023-04-22 13:10:31.463703+00',
    NULL,
    '',
    NULL,
    '',
    '2023-04-22 13:10:03.275387+00',
    '',
    '',
    NULL,
    '2023-04-22 13:10:31.458239+00',
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    NULL,
    '2022-10-04 03:41:27.391146+00',
    '2023-04-22 13:10:31.463703+00',
    NULL,
    NULL,
    '',
    '',
    NULL,
    '',
    0,
    NULL,
    '',
    NULL
  );
INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  )
VALUES (
    '185f2f83-d63a-4c9b-b4a0-7e4a885799e2',
    '185f2f83-d63a-4c9b-b4a0-7e4a885799e2'::uuid,
    '{"sub": "185f2f83-d63a-4c9b-b4a0-7e4a885799e2", "email": "user1@email.com"}',
    'email',
    '2023-04-22 13:10:31.458239+00',
    '2022-10-04 03:41:27.391146+00',
    '2023-04-22 13:10:31.463703+00'
  ),
  (
    'c182a6c2-7d04-44bf-ad5b-70992f3f22fa',
    'c182a6c2-7d04-44bf-ad5b-70992f3f22fa'::uuid,
    '{"sub": "c182a6c2-7d04-44bf-ad5b-70992f3f22fa", "email": "user2@email.com"}',
    'email',
    '2023-04-22 13:10:31.458239+00',
    '2022-10-04 03:41:27.391146+00',
    '2023-04-22 13:10:31.463703+00'
  );
INSERT INTO tasks (id, user_id, name, rrule)
VALUES (
    '1d86b85f-2ce3-4586-a1d3-7885825b2722',
    '185f2f83-d63a-4c9b-b4a0-7e4a885799e2',
    'Do this every other day (user1@email.com)',
    'DTSTART:20230720T000000Z\nRRULE:FREQ=DAILY;INTERVAL=2'
  ),
  (
    'fc41aedf-c7c8-47f3-8bf1-82888086ee4d',
    '185f2f83-d63a-4c9b-b4a0-7e4a885799e2',
    'Dayly task (user1@email.com)',
    'DTSTART:20230701T000000Z\nRRULE:FREQ=DAILY;INTERVAL=1'
  ),
  (
    '32285fb8-5d5d-4f26-a07c-45c4f6b47d23',
    '185f2f83-d63a-4c9b-b4a0-7e4a885799e2',
    'Weekly task on Mondays & Wednesdays (user1@email.com)',
    'DTSTART:20230703T000000Z\nRRULE:FREQ=WEEKLY;BYDAY=MO,WE'
  ),
  (
    '895074d7-ed1a-4911-b9ec-c074769ff565',
    'c182a6c2-7d04-44bf-ad5b-70992f3f22fa',
    'Weekly task on Tuesdays, Thursdays, & Fridays (user2@email.com)',
    'DTSTART:20230703T000000Z\nRRULE:FREQ=WEEKLY;BYDAY=TU,TH,FR'
  );
INSERT INTO subtasks (user_id, task_id, name)
VALUES (
    '185f2f83-d63a-4c9b-b4a0-7e4a885799e2',
    '1d86b85f-2ce3-4586-a1d3-7885825b2722',
    'Subtask 1'
  ),
  (
    '185f2f83-d63a-4c9b-b4a0-7e4a885799e2',
    '1d86b85f-2ce3-4586-a1d3-7885825b2722',
    'Subtask 2'
  ),
  (
    '185f2f83-d63a-4c9b-b4a0-7e4a885799e2',
    '1d86b85f-2ce3-4586-a1d3-7885825b2722',
    'Subtask 3'
  );