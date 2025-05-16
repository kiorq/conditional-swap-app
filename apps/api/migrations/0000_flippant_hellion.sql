CREATE TABLE `swap_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`status` text NOT NULL,
	`from_token` text NOT NULL,
	`to_token` text NOT NULL,
	`from_amount` text NOT NULL,
	`to_amount` text NOT NULL,
	`min_threshold` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer NOT NULL,
	`instant` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
