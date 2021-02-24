export class CardWithPriceInfo {
  card: CardInfo;
  priceInfo: PriceInfo[];
}

export class CardInfo {
  productId: number;
  name: string;
  cleanName: string;
  imageUrl: string;
  categoryId: number;
  groupId: number;
  url: string;
  modifiedOn: string;
  imageCount: number;
  presaleInfo: PresaleInfo;
  extendedData: ExtendedData[];
}

export class PriceInfo {
  productId: number;
  lowPrice: number;
  midPrice: number;
  highPrice: number;
  marketPrice: number;
  directLowPrice: number;
  subTypeName: string;
}

export class PresaleInfo {
  isPresale: boolean;
  releasedOn: string;
  note: string;
}

export class ExtendedData {
  name: string;
  displayName: string;
  value: string;
}
