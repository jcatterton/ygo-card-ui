import { TestBed } from '@angular/core/testing';
import { CardService } from './card.service';
import { HttpService } from "../http/http.service";
import { MockHttpService } from "../../mocks/services";

describe('CardService', () => {
  let service: CardService;
  let http: MockHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          { provide: HttpService, useClass: MockHttpService }
        ]
      });
      service = TestBed.inject(CardService);
      http = TestBed.inject(HttpService);
    });

  it("should be created", () => {
    const service: CardService = TestBed.get(CardService);
    expect(service).toBeTruthy();
  });

  describe("getCards", () => {
    it("should call http get", () => {
      const httpSpy = spyOn(http, "get");
      service.getCards();
      expect(httpSpy).toHaveBeenCalledWith(`${service.baseURL}/cards`);
    });
  });

  describe("getCardById", () => {
    it("should call http get", () => {
      const httpSpy = spyOn(http, "get");
      service.getCardById(1);
      expect(httpSpy).toHaveBeenCalledWith(`${service.baseURL}/card/1`);
    });
  });

  describe("processCards", () => {
    it("should call http post", () => {
      const httpSpy = spyOn(http, "post");
      service.processCards();
      expect(httpSpy).toHaveBeenCalledWith(`${service.baseURL}/process`, null);
    });
  });

  describe("deleteCard", () => {
    it("should call http delete", () => {
      const httpSpy = spyOn(http, "delete");
      service.deleteCard("test");
      expect(httpSpy).toHaveBeenCalledWith(`${service.baseURL}/card/test`);
    });
  });

  describe("addCard", () => {
    it("shoud call http post", () => {
      const httpSpy = spyOn(http, "post");
      service.addCard("test");
      expect(httpSpy).toHaveBeenCalledWith(`${service.baseURL}/card/test`, null);
    });
  });
});
