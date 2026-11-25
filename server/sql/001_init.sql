CREATE TABLE IF NOT EXISTS schema_migrations (
  version VARCHAR(100) NOT NULL,
  applied_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (version)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS leads (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  reference VARCHAR(20) NOT NULL,
  schema_version VARCHAR(10) NOT NULL,
  form_type VARCHAR(40) NOT NULL,
  team VARCHAR(40) NOT NULL,
  status ENUM('new', 'in_progress', 'contacted', 'closed', 'spam') NOT NULL DEFAULT 'new',
  name VARCHAR(200) NULL,
  email VARCHAR(254) NULL,
  phone VARCHAR(40) NULL,
  service_category VARCHAR(120) NULL,
  source_path VARCHAR(2048) NOT NULL,
  referrer_origin VARCHAR(255) NULL,
  campaign JSON NULL,
  payload JSON NOT NULL,
  consent_at DATETIME(3) NOT NULL,
  submitted_at DATETIME(3) NOT NULL,
  received_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  ip_hash CHAR(64) NULL,
  user_agent VARCHAR(512) NULL,
  admin_notes TEXT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_leads_reference (reference),
  KEY idx_leads_status_received (status, received_at),
  KEY idx_leads_team_received (team, received_at),
  KEY idx_leads_form_received (form_type, received_at),
  KEY idx_leads_email (email),
  KEY idx_leads_received (received_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS lead_attachments (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  lead_id BIGINT UNSIGNED NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  stored_name VARCHAR(120) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  byte_size INT UNSIGNED NOT NULL,
  sha256 CHAR(64) NOT NULL,
  scan_status ENUM('pending', 'clean', 'infected') NOT NULL DEFAULT 'pending',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_lead_attachments_stored (stored_name),
  KEY idx_lead_attachments_lead (lead_id),
  CONSTRAINT fk_lead_attachments_lead FOREIGN KEY (lead_id) REFERENCES leads (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
