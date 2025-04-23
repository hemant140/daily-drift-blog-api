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

    describe("Auth SIGNUP API Testing:-", () => {

        it("Email validation error return on signup api", async () => {
            const response = await request(app.getHttpServer()).post("/auth/signup")
                .send({ name: "test", email: "testgmail.com", password: "test124" });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("email must be a valid email")

        })

        it("Password validation error return on signup api", async () => {
            const response = await request(app.getHttpServer()).post("/auth/signup")
                .send({ name: "test", email: "test@gmail.com", password: "tes" })

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("password length must be at least 4 characters long")
        })

        it("Fields missing validation error return on signup api", async () => {
            const response = await request(app.getHttpServer()).post("/auth/signup")
                .send({ name: "test", email: "test@gmail.com" })

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('password is required')
        })

        it("Signup successfull with valid parameters", async () => {
            const uniqueEmail = `test_${Date.now()}@gmail.com`;
            const response = await request(app.getHttpServer()).post("/auth/signup")
                .send({ name: "test", email: uniqueEmail, password: "test", })

            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Sign up successfully")

        })

    })

    describe("Auth SIGNIN API Testing:-", () => {

        it("Email validation error return on signin api", async () => {
            const response = await request(app.getHttpServer()).post("/auth/signin")
                .send({ email: "testgmail.com", password: "test124" });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("email must be a valid email")

        })

        it("Password validation error return on signin api", async () => {
            const response = await request(app.getHttpServer()).post("/auth/signin")
                .send({ email: "test@gmail.com", password: "tes" })

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("password length must be at least 4 characters long")
        })

        it("Signin successfull with valid credentials", async () => {
            const response = await request(app.getHttpServer()).post("/auth/signin")
                .send({ email: "test@gmail.com", password: "test" })

            expect(response.status).toBe(201);

        })

    })
});
