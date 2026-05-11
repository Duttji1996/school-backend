import { IsEmail, IsNotEmpty, IsString, MaxLength, Matches } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  subject: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  // Prevent malicious links by limiting URLs or specific patterns if needed
  // For now, let's just ensure it's a string and doesn't contain common XSS patterns
  @Matches(/^[^<>]*$/, {
    message: 'Message contains invalid characters (HTML tags not allowed)',
  })
  message: string;
}
