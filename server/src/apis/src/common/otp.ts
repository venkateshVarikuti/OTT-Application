import speakeasy from "speakeasy";

// Generate a secret
export const generateSecret = (): string => {
    const secret = speakeasy.generateSecret({ length: 20 });
    return secret.base32;
};

// Generate an OTP code based on the secret
export const generateOTPCode = (secret: string): string => {
    const otpCode = speakeasy.totp({
        secret,
        encoding: 'base32',
        step: 600, // OTP is valid for 600 seconds 
    });
    return otpCode;
};