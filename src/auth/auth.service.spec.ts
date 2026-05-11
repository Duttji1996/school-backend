import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    usersService = {
      findOneByEmail: jest.fn(),
    };
    jwtService = {
      sign: jest.fn().mockReturnValue('dummy_token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should throw UnauthorizedException if password does not match', async () => {
      const user = { email: 'test@test.com', password: 'hashed_password' } as any;
      (usersService.findOneByEmail as jest.Mock).mockResolvedValue(user);
      
      // Assuming comparePassword logic is mocked or simplified in dummy
      // In a real app, you'd mock bcrypt.compare
      
      await expect(service.login('test@test.com', 'wrong_password')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return access token if credentials are valid', async () => {
      const user = { id: 'uuid', email: 'test@test.com', role: 'admin' } as any;
      (usersService.findOneByEmail as jest.Mock).mockResolvedValue(user);
      
      const result = await service.login('test@test.com', 'correct_password');
      expect(result).toHaveProperty('access_token');
      expect(result.access_token).toBe('dummy_token');
    });
  });
});
