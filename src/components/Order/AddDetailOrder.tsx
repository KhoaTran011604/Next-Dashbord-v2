import { Button } from "@/styles/components/ui/button";
import { Input } from "@/styles/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { GetAllProductFK } from "api/productService";
import React from "react";
import Select from "../common/Select";
import HD_Input from "../common/HD_Input";

type DetailItem = {
  id: number | null;
  productId: string | null;
  productName: string | null;
  price: number;
  quantity: number | string;
  selectedVariant: any;
};

type AddDetailOrderProps = {
  isEdit?: boolean;
  isConfirm?: boolean;
  initData?: DetailItem[];
  onChange: (newDetail: DetailItem[]) => void;
};
type ProductProps = {
  _id: string;
  name: string;
  price: number;
  variants: [
    {
      id: string;
      color: string;
      size: string;
      quantity: number;
    }
  ];
};

const INIT_REQUEST: DetailItem = {
  id: null,
  productId: "",
  productName: "",
  price: 0,
  quantity: 0,
  selectedVariant: {},
};
const INIT_PRODUCT: ProductProps = {
  _id: "",
  price: 0,
  name: "",
  variants: [
    {
      color: "",
      id: "",
      quantity: 0,
      size: "",
    },
  ],
};
const AddDetailOrder: React.FC<AddDetailOrderProps> = ({
  isEdit = false,
  isConfirm = false,
  initData = [],
  onChange,
}) => {
  const [request, setRequest] = React.useState<DetailItem>(INIT_REQUEST);
  const [detail, setDetail] = React.useState<DetailItem[]>([]);
  const [errors, setErrors] = React.useState<string[]>([]);
  const [products, setProducts] = React.useState<ProductProps[]>([]);
  const [seletedProduct, setSeletedProduct] =
    React.useState<ProductProps>(INIT_PRODUCT);
  console.log("request", request);
  console.log("initData", initData);

  const onValidate = () => {
    const listError: string[] = [];
    if (request.productId === "" || request.productId == null)
      listError.push("productId");
    if (request.quantity === "" || request.quantity == null)
      listError.push("quantity");

    setErrors(listError);
    return listError.length === 0;
  };

  const handleChangeDetail = () => {
    if (!onValidate()) return;

    const parsedQuantity = Number(request.quantity);
    const quantity = isNaN(parsedQuantity) ? 0 : parsedQuantity;

    let newDetail: DetailItem[] = [];

    if (request.id == null) {
      newDetail = [
        ...detail,
        {
          ...request,
          id: Math.random(),
          quantity,
        },
      ];
    } else {
      const index = detail.findIndex((d) => d.id === request.id);
      if (index !== -1) {
        newDetail = [...detail];
        newDetail[index] = { ...request, quantity };
      }
    }

    setDetail(newDetail);
    onChange(newDetail);
    setRequest(INIT_REQUEST);
    setErrors([]);
  };

  const handleDeleteItem = (itemDelete: DetailItem) => {
    const filtered = detail.filter((item) => item.id !== itemDelete.id);
    setDetail(filtered);
    onChange(filtered);
    if (itemDelete.id === request.id) {
      setRequest({ ...INIT_REQUEST });
    }
  };
  const LoadDataFK = async () => {
    GetAllProductFK({})
      .then((res) => {
        if (res.success) {
          setProducts(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };
  React.useEffect(() => {
    LoadDataFK();
    if (
      Array.isArray(initData) &&
      initData.length === 1 &&
      Object.keys(initData[0]).length === 0
    ) {
      setDetail([]);
    }
    if (initData?.length) setDetail(initData);
  }, [initData]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 border border-gray-300 dark:border-gray-500 rounded-lg p-4">
        {(!isEdit || (isEdit && !isConfirm)) && (
          <>
            <div>
              <Select
                {...{
                  error: errors.includes("productId"),
                  hint: errors.includes("productId") ? "Required field" : "",
                }}
                title={"Product"}
                name={"ProductId"}
                defaultValue={request.productId}
                options={products.map((product) => ({
                  label: product.name,
                  value: product._id,
                }))}
                placeholder="Select an option"
                onChange={(e) => {
                  const productSelected = products.find(
                    (pro) => pro._id === e.value
                  );
                  var selectedVariantDefault = {};
                  if (productSelected.variants) {
                    selectedVariantDefault = productSelected.variants[0];
                  }
                  setSeletedProduct(productSelected);
                  setRequest({
                    ...request,
                    productId: e.value,
                    productName: e.label,
                    price: productSelected.price,
                    selectedVariant: selectedVariantDefault,
                  });
                }}
                className="dark:bg-dark-900"
              />
            </div>
            <div>
              <HD_Input
                title="Price"
                name="price"
                type="number"
                disabled={true}
                isItemForm={false}
                initValue={request.price}
                onChange={(e) => {
                  setRequest({
                    ...request,
                    price: e,
                  });
                }}
              />
            </div>
            <div>
              <Select
                {...{
                  error: errors.includes("selectedVariant"),
                  hint: errors.includes("selectedVariant")
                    ? "Required field"
                    : "",
                }}
                title={"Selected Variant"}
                name={"selectedVariant"}
                defaultValue={"xxx"}
                options={
                  !seletedProduct.variants
                    ? []
                    : seletedProduct.variants.map((variant) => ({
                        label: `${variant.color} - ${variant.size}`,
                        value: variant.id,
                      }))
                }
                placeholder="Select an option"
                onChange={(e) => {
                  const variantSelected = seletedProduct.variants.find(
                    (pro) => pro.id === e.value
                  );
                  console.log("variantSelected", variantSelected);

                  setRequest({
                    ...request,
                    selectedVariant: variantSelected,
                  });
                }}
                className="dark:bg-dark-900"
              />
            </div>
            <div>
              <HD_Input
                title="Quantity"
                name="quantity"
                type="number"
                isItemForm={false}
                initValue={request.quantity}
                onChange={(e) => {
                  setRequest({
                    ...request,
                    quantity: e,
                  });
                }}
              />
            </div>
            <div className="text-end space-x-2 m-auto">
              <Button
                className="mt-6"
                variant="outline"
                type="button"
                onClick={() => {
                  setRequest(INIT_REQUEST);
                  setErrors([]);
                  setSeletedProduct(INIT_PRODUCT);
                }}
              >
                Reset
              </Button>
              <Button
                className="mt-6"
                type="button"
                onClick={handleChangeDetail}
              >
                {request.id ? "Update" : "Add"}
              </Button>
            </div>
          </>
        )}

        {detail.length > 0 && (
          <>
            <div className="border-t border-gray-300 col-span-full my-2"></div>
            <div className="col-span-full">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-3">Product</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Variant</th>
                      <th className="px-6 py-3 text-end">Qty</th>
                      <th className="px-6 py-3 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.map((item) => (
                      <tr
                        key={Math.random()}
                        className="bg-white dark:bg-gray-800 border-b dark:border-gray-700"
                        onClick={() => {
                          setRequest(item);
                          console.log("item", item);

                          const productSelected = products.find(
                            (pro) => pro._id === item.productId
                          );
                          var selectedVariantDefault = {};
                          if (productSelected.variants) {
                            selectedVariantDefault =
                              productSelected.variants[0];
                          }
                          setSeletedProduct(productSelected);
                        }}
                      >
                        <td className="px-6 py-4">{item.productName}</td>
                        <td className="px-6 py-4">{item.price}</td>

                        <td className="px-6 py-4 ">{`${item.selectedVariant?.color} - ${item.selectedVariant?.size}`}</td>
                        <td className="px-6 py-4 text-end">{item.quantity}</td>
                        <td className="px-6 py-4 text-end">
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={isEdit && isConfirm}
                            onClick={(e) => {
                              e.stopPropagation(); // tránh trigger setRequest
                              handleDeleteItem(item);
                            }}
                          >
                            x
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddDetailOrder;
