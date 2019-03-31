export interface ExpressError {
  syscall?: string;
  code?: string;
  message?: string;
  status?: number;
}
