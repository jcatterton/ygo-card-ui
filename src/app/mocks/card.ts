import { CardWithPriceInfo } from "../models/card.model";

export class MockCard {
  static mockCard1: CardWithPriceInfo = {
    card: {
      productId: 1,
      name: "test1",
      cleanName: "test",
      imageUrl: "test",
      categoryId: 1,
      groupId: 1,
      url: "test",
      modifiedOn: "test",
      imageCount: 1,
      presaleInfo: {
        isPresale: false,
        releasedOn: "test",
        note: "test"
      },
      extendedData: [
        {
          name: "Number",
          displayName: "test",
          value: "test"
        },
        {
          name: "Card Type",
          displayName: "test",
          value: "test1"
        }
      ],
    },
    priceInfo: [
      {
        productId: 1,
        lowPrice: 1,
        midPrice: 1,
        highPrice: 1,
        marketPrice: 1,
        directLowPrice: 1,
        subTypeName: "test",
      }
    ]
  };

  static mockCard2: CardWithPriceInfo = {
    card: {
      productId: 1,
      name: "test2",
      cleanName: "test",
      imageUrl: "test",
      categoryId: 1,
      groupId: 1,
      url: "test",
      modifiedOn: "test",
      imageCount: 1,
      presaleInfo: {
        isPresale: false,
        releasedOn: "test",
        note: "test"
      },
      extendedData: [
        {
          name: "Number",
          displayName: "test",
          value: "test"
        },
        {
          name: "Card Type",
          displayName: "test",
          value: "test1"
        }
      ],
    },
    priceInfo: [
      {
        productId: 1,
        lowPrice: 1,
        midPrice: 1,
        highPrice: 1,
        marketPrice: 1,
        directLowPrice: 1,
        subTypeName: "test",
      }
    ]
  };

  static mockCard3: CardWithPriceInfo = {
    card: {
      productId: 1,
      name: "test3",
      cleanName: "test",
      imageUrl: "test",
      categoryId: 1,
      groupId: 1,
      url: "test",
      modifiedOn: "test",
      imageCount: 1,
      presaleInfo: {
        isPresale: false,
        releasedOn: "test",
        note: "test"
      },
      extendedData: [
        {
          name: "Number",
          displayName: "test",
          value: "test"
        },
        {
          name: "Card Type",
          displayName: "test",
          value: "test1"
        }
      ],
    },
    priceInfo: [
      {
        productId: 1,
        lowPrice: 1,
        midPrice: 1,
        highPrice: 1,
        marketPrice: 1,
        directLowPrice: 1,
        subTypeName: "Unlimited"
      },
      {
        productId: 1,
        lowPrice: 2,
        midPrice: 2,
        highPrice: 2,
        marketPrice: 2,
        directLowPrice: 2,
        subTypeName: "Limited"
      },
      {
        productId: 3,
        lowPrice: 3,
        midPrice: 3,
        highPrice: 3,
        marketPrice: 3,
        directLowPrice: 3,
        subTypeName: "1st Edition"
      }
    ]
  };

  static mockCards: CardWithPriceInfo[] = [ MockCard.mockCard1, MockCard.mockCard2, MockCard.mockCard3 ];
}
