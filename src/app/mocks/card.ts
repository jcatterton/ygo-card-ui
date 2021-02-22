import { Card } from "../models/card.model";

export class MockCard {
  static mockCard: Card = {
    cardInfo: {
      productId: 1,
      name: "test",
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

  static mockCards: Card[] = [ MockCard.mockCard ];
}
