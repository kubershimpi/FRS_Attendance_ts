/**
 * Utility: Password Security Infrastructure
 * Responsibility: Validates credential complexity and integrity.
 */
export class PasswordValidator {
  /**
   * Logic: Security Compliance Assessment
   * @param pass - The newly entered passphrase
   * @param confirm - The confirmation passphrase for matching
   */
  static validate(pass: string, confirm: string) {
    // Logic: Minimum length requirement (Senior Standard: 8+)
    const minLengthRequirement = pass.length >= 8;

    // Logic: Complexity requirement (Alpha-numeric and Special Characters)
    // Professional Regex: Covers digits and common symbols
    const complexityRequirement =
      /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass);

    // Logic: Integrity check (Identity confirmation)
    const integrityMatch = pass === confirm && pass.length > 0;

    return {
      minLengthRequirement,
      complexityRequirement,
      integrityMatch,
      // Total Validation State
      isValid: minLengthRequirement && complexityRequirement && integrityMatch,
    };
  }
}
