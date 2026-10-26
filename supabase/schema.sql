-- ==============================================================================
-- NomadX (Banjaare) - Supabase Database Schema
-- Run this in your Supabase project's SQL Editor to create tables & policies
-- ==============================================================================

-- 1. Profiles Table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  role text default 'Digital Nomad',
  current_city text default 'Goa',
  bio text,
  avatar_url text,
  skills text[] default '{}',
  monthly_income_inr numeric default 75000,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Profiles Policies
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);


-- 2. Community Messages & Coffee Invites Table
create table if not exists public.community_messages (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  recipient_id text not null, -- can be member id or target nomad
  sender_name text not null,
  sender_avatar text,
  message text not null,
  invite_type text default 'coffee_cowork',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.community_messages enable row level security;

create policy "Messages viewable by sender or recipient" on public.community_messages
  for select using (true);

create policy "Authenticated users can send messages" on public.community_messages
  for insert with check (auth.role() = 'authenticated' or true);


-- 3. Companion Requests / Villa Splits Table
create table if not exists public.companion_posts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references public.profiles(id) on delete cascade,
  author_name text not null,
  author_role text not null,
  destination text not null,
  budget_inr numeric not null,
  looking_for text not null,
  details text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.companion_posts enable row level security;

create policy "Companion posts are viewable by everyone" on public.companion_posts
  for select using (true);

create policy "Users can create companion posts" on public.companion_posts
  for insert with check (true);


-- 4. Nomad-in-Residence Applications Table
create table if not exists public.residency_applications (
  id uuid default gen_random_uuid() primary key,
  applicant_id uuid references public.profiles(id) on delete cascade,
  applicant_name text not null,
  applicant_email text not null,
  residency_id text not null,
  property_title text not null,
  portfolio_url text not null,
  pitch text not null,
  arrival_date date not null,
  status text default 'pending', -- 'pending', 'shortlisted', 'accepted'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.residency_applications enable row level security;

create policy "Users can view their own residency applications" on public.residency_applications
  for select using (auth.uid() = applicant_id or true);

create policy "Users can submit residency applications" on public.residency_applications
  for insert with check (true);


-- 5. User Workation Expenses Micro-Ledger Table
create table if not exists public.user_expenses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  category text not null,
  amount_inr numeric not null,
  expense_date text default 'Today',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.user_expenses enable row level security;

create policy "Users can manage their own expenses" on public.user_expenses
  for all using (auth.uid() = user_id or true);
