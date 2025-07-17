import { Button } from "@/styles/components/ui/button";
import { Input } from "@/styles/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";

type DetailItem = {
  id: number | null;
  color: string;
  size: string;
  quantity: number | string;
};

type AddVariantsProductProps = {
  isEdit?: boolean;
  isConfirm?: boolean;
  initData?: DetailItem[];
  onChange: (newDetail: DetailItem[]) => void;
};

const INIT_REQUEST: DetailItem = {
  id: null,
  color: "",
  size: "",
  quantity: "",
};

const AddVariantsProduct: React.FC<AddVariantsProductProps> = ({
  isEdit = false,
  isConfirm = false,
  initData = [],
  onChange,
}) => {
  const [request, setRequest] = React.useState<DetailItem>(INIT_REQUEST);
  const [detail, setDetail] = React.useState<DetailItem[]>([]);
  const [errors, setErrors] = React.useState<string[]>([]);

  const onValidate = () => {
    const listError: string[] = [];
    if (!request.color) listError.push("color");
    if (!request.size) listError.push("size");
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

  React.useEffect(() => {
    if (initData?.length) setDetail(initData);
  }, [initData]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border border-gray-300 dark:border-gray-500 rounded-lg p-2">
        {(!isEdit || (isEdit && !isConfirm)) && (
          <>
            <div>
              <Label>Color</Label>
              <Input
                value={request.color}
                //error={errors.includes("color")}
                //hint={errors.includes("color") ? "Required" : ""}
                onChange={(e) =>
                  setRequest({ ...request, color: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Size</Label>
              <Input
                value={request.size}
                //error={errors.includes("size")}
                //hint={errors.includes("size") ? "Required" : ""}
                onChange={(e) =>
                  setRequest({ ...request, size: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                className="text-right"
                value={request.quantity}
                //error={errors.includes("quantity")}
                //hint={errors.includes("quantity") ? "Required" : ""}
                onChange={(e) =>
                  setRequest({ ...request, quantity: e.target.value })
                }
              />
            </div>
            <div className="text-end space-x-2">
              <Button
                className="mt-6"
                variant="outline"
                type="button"
                onClick={() => {
                  setRequest(INIT_REQUEST);
                  setErrors([]);
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
                      <th className="px-6 py-3">Color</th>
                      <th className="px-6 py-3">Size</th>
                      <th className="px-6 py-3 text-end">Quantity</th>
                      <th className="px-6 py-3 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.map((item) => (
                      <tr
                        key={Math.random()}
                        className="bg-white dark:bg-gray-800 border-b dark:border-gray-700"
                        onClick={() => setRequest(item)}
                      >
                        <td className="px-6 py-4">{item.color}</td>
                        <td className="px-6 py-4">{item.size}</td>
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

export default AddVariantsProduct;
