export interface SearchLog {
  domain: string;
  status: "up" | "down";
  responseTime: number;
  statusCode: number;
  timestamp: string;
}

export interface OutageReport {
  domain: string;
  status: "down";
  reportTime: string;
}

export interface CheckResult {
  domain: string;
  fullUrl: string;
  status: "up" | "down";
  statusCode: number;
  statusText: string;
  ip: string;
  dnsStatus: "passed" | "failed";
  responseTime: number;
  sslStatus: "valid" | "expired" | "none";
  sslDetails: {
    issuer: string;
    subject: string;
    validFrom: string;
    validTo: string;
    daysRemaining: number;
    serialNumber: string;
  } | null;
  headers: Record<string, string>;
  checkedAt: string;
}

export interface DnsLookupResult {
  domain: string;
  A: string[];
  AAAA: string[];
  MX: Array<{ exchange: string; priority: number }> | string[];
  TXT: string[][];
  NS: string[];
  CNAME: string[];
  SOA: {
    nsname: string;
    hostmaster: string;
    serial: number;
    refresh: number;
    retry: number;
    expire: number;
    minttl: number;
  } | null;
}

export interface SSLCheckResult {
  domain: string;
  isValid: boolean;
  subject: {
    commonName: string;
    organization: string;
    country: string;
  };
  issuer: {
    commonName: string;
    organization: string;
  };
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  serialNumber: string;
  fingerprint: string;
  fingerprint256: string;
}

export interface WhoisResult {
  domain: string;
  raw: string;
  source: string;
  isFallback: boolean;
  parsed?: {
    domainName: string;
    registrar: string;
    creationDate: string;
    updatedDate: string;
    expiryDate: string;
    nameServers: string[];
  };
}

export interface PortCheckResult {
  host: string;
  port: number;
  open: boolean;
  latency: number | null;
  status: string;
  description: string;
}

export interface PingResult {
  host: string;
  success: boolean;
  runs: Array<{ seq: number; latency: number }>;
  stats: {
    min: number;
    max: number;
    avg: number;
    lossPercent: number;
  };
  error?: string;
}

export interface DnsPropagationResult {
  host: string;
  recordType: string;
  nodes: Array<{
    location: string;
    resolved: boolean;
    ips: string[];
    status: string;
  }>;
  checkedAt: string;
}
