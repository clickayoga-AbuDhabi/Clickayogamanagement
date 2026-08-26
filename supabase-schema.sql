-- Run this once in your Supabase project: SQL Editor → New query → paste → Run.
-- Creates the 5 tables the app uses, with text ids matching the app's own id format.

create table if not exists trainers (
  id text primary key,
  name text not null,
  cred text,
  "baseSalary" numeric not null default 0,
  "commissionRate" numeric not null default 0.2,
  "monthlyTarget" integer not null default 0
);

create table if not exists packages (
  id text primary key,
  name text not null,
  classes integer,
  price numeric not null default 0,
  type text not null default 'private'
);

create table if not exists customers (
  id text primary key,
  name text not null,
  phone text,
  email text,
  location text,
  "packageId" text references packages(id),
  "classesRemaining" text,
  joined text
);

create table if not exists classes (
  id text primary key,
  date text not null,
  time text not null,
  "trainerId" text references trainers(id),
  "customerId" text references customers(id),
  status text not null default 'scheduled'
);

create table if not exists payments (
  id text primary key,
  "customerId" text references customers(id),
  amount numeric not null default 0,
  date text not null,
  note text
);

-- Enable Row Level Security and allow any signed-in user (your 3 staff accounts)
-- full read/write access. This is a small internal tool, so all staff share the
-- same access level — there's no need for per-row ownership rules here.
alter table trainers enable row level security;
alter table packages enable row level security;
alter table customers enable row level security;
alter table classes enable row level security;
alter table payments enable row level security;

create policy "Authenticated staff can read/write trainers" on trainers
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated staff can read/write packages" on packages
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated staff can read/write customers" on customers
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated staff can read/write classes" on classes
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Authenticated staff can read/write payments" on payments
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Turn on realtime so all 3 staff see each other's changes live.
alter publication supabase_realtime add table trainers, packages, customers, classes, payments;
