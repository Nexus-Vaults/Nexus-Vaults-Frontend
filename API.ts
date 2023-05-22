export abstract class ApiClient {
  abstract getCatalogAddress(): `0x${string}`;
}

class ApiClientMock extends ApiClient {
  getCatalogAddress(): `0x${string}` {
    // @ts-ignore
    return undefined;
  }
}

export const apiClient: ApiClient = new ApiClientMock();
