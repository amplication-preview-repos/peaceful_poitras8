import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { OAuthProviderController } from "../oAuthProvider.controller";
import { OAuthProviderService } from "../oAuthProvider.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  clientId: "exampleClientId",
  clientSecret: "exampleClientSecret",
  createdAt: new Date(),
  id: "exampleId",
  providerName: "exampleProviderName",
  redirectUri: "exampleRedirectUri",
  scope: "exampleScope",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  clientId: "exampleClientId",
  clientSecret: "exampleClientSecret",
  createdAt: new Date(),
  id: "exampleId",
  providerName: "exampleProviderName",
  redirectUri: "exampleRedirectUri",
  scope: "exampleScope",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    clientId: "exampleClientId",
    clientSecret: "exampleClientSecret",
    createdAt: new Date(),
    id: "exampleId",
    providerName: "exampleProviderName",
    redirectUri: "exampleRedirectUri",
    scope: "exampleScope",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  clientId: "exampleClientId",
  clientSecret: "exampleClientSecret",
  createdAt: new Date(),
  id: "exampleId",
  providerName: "exampleProviderName",
  redirectUri: "exampleRedirectUri",
  scope: "exampleScope",
  updatedAt: new Date(),
};

const service = {
  createOAuthProvider() {
    return CREATE_RESULT;
  },
  oAuthProviders: () => FIND_MANY_RESULT,
  oAuthProvider: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("OAuthProvider", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: OAuthProviderService,
          useValue: service,
        },
      ],
      controllers: [OAuthProviderController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /oAuthProviders", async () => {
    await request(app.getHttpServer())
      .post("/oAuthProviders")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /oAuthProviders", async () => {
    await request(app.getHttpServer())
      .get("/oAuthProviders")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /oAuthProviders/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/oAuthProviders"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /oAuthProviders/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/oAuthProviders"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /oAuthProviders existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/oAuthProviders")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/oAuthProviders")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
