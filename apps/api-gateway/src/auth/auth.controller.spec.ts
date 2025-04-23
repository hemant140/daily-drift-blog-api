import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';


describe('AuthController', () => {
    let app: INestApplication;
    let authService = { signup: jest.fn(), signin: jest.fn() };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: authService,
                },
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe("Auth API Testing:- Signup and Signin", () => {

        it("Email validation error return on sign in api", async () => {
            const response = await request(app.getHttpServer()).post("/auth/signin")
                .send({ email: "testgamil.com", password: "test124" });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("email must be a valid email")

        })

    })
});
