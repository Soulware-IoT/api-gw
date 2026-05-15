export class LoginResponseDto {
    profileId: number;
    userId: string;
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    refreshToken: string;
    fullName: string;
    email: string;
}