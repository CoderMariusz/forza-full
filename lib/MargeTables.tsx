import { Product } from '@/store/Products';

function mergeTables(products: any, labels: any) {
  return products.map((product: Product) => {
    const result = {
      aCode: product.aCode,
      $id: product.$id,
      packetInBox: product.packetInBox,
      labels: product.labels?.map((label) => {
        const foundLabel = labels.find((l: any) => l.code === label.code);

        return {
          code: label.code,
          quantity: foundLabel ? foundLabel.quantity : 0,
          $id: foundLabel ? foundLabel.$id : null // Here we are adding id to the label as well.
        };
      })
    };
    return result;
  });
}

export default mergeTables;
