import { useState } from "react";

interface List {
  name: string;
  id: number;
  checked: boolean;
}
function MainBox() {
  const list1obj: List[] = [
    {
      name: "Reebok",
      id: 1,
      checked: false,
    },
    {
      name: "Prada",
      id: 2,
      checked: false,
    },
    {
      name: "Gucci",
      id: 3,
      checked: false,
    },
    {
      name: "H&M",
      id: 4,
      checked: false,
    },
  ];

  const list2obj: List[] = [
    {
      name: "Armaani",
      id: 1,
      checked: false,
    },
    {
      name: "Bata",
      id: 2,
      checked: false,
    },
    {
      name: "Colgate",
      id: 3,
      checked: false,
    },
    {
      name: "ITC",
      id: 4,
      checked: false,
    },
  ];
  const [list1, setList1] = useState<List[]>(list1obj);
  const [list2, setList2] = useState<List[]>(list2obj);

  function moveLeftItemsToRight(): void {
    const dummylist1 = [...list1, ...list2];
    setList1(dummylist1);
    setList2([]);
  }
  function moveRightItemsToLeft(): void {
    setList2(prev => {
      return [...prev, ...list1];
    });
    setList1([]);
  }

  function checkItem(selectedItem: List): void {
    setList1(prev => {
      const items = [...prev];
      return items.map(item => {
        if (item?.name === selectedItem?.name) {
          return {
            ...item,
            checked: !selectedItem?.checked,
          };
        } else {
          return item;
        }
      });
    });
    setList2(prev => {
      const items = [...prev];
      return items.map(item => {
        if (item?.name === selectedItem?.name) {
          return {
            ...item,
            checked: !selectedItem?.checked,
          };
        } else {
          return item;
        }
      });
    });
  }

  function filterItems(list: List[]): List[] {
    const filteredItems = list.filter(item => {
      if (item?.checked) {
        return true;
      } else {
        return false;
      }
    });
    return filteredItems;
  }
  function moveSelectedItemsToRight() {
    const leftSelectedItems: List[] = filterItems(list1);
    setList1(prev => {
      return prev.filter(item => {
        if (item?.checked) {
          return false;
        } else {
          return true;
        }
      });
    });

    setList2(prev => {
      const items = [...prev, ...leftSelectedItems];
      return items;
    });
  }

  function moveSelectedItemsToLeft() {
    const leftSelectedItems: List[] = filterItems(list2);
    setList2(prev => {
      return prev.filter(item => {
        if (item?.checked) {
          return false;
        } else {
          return true;
        }
      });
    });

    setList1(prev => {
      const items = [...prev, ...leftSelectedItems];
      return items;
    });
  }

  function checkButtonDisable() {
    const common = [...list1, ...list2];
    return common.find(item => item?.checked) ? false : true;
  }
  return (
    <div className="outer_main_box">
      <h2>Transfer List</h2>
      <div className="verticalSpacing" />
      <div className="main_box">
        <div className="left_main_box">
          <div className="left_list">
            {list1.map((item, index) => (
              <div key={index} className="list_item">
                <input
                  type="checkbox"
                  checked={item?.checked}
                  onClick={() => checkItem(item)}
                  onChange={() => {}}
                />
                <label>{item?.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="center_main_box">
          <button onClick={moveLeftItemsToRight}>{"<<"}</button>
          <button
            onClick={moveSelectedItemsToRight}
            disabled={checkButtonDisable()}
          >
            {">"}
          </button>
          <button
            onClick={moveSelectedItemsToLeft}
            disabled={checkButtonDisable()}
          >
            {"<"}
          </button>
          <button onClick={moveRightItemsToLeft}>{">>"}</button>
        </div>
        <div className="right_main_box">
          <div className="left_list">
            {list2.map((item, index) => (
              <div key={index} className="list_item">
                <input
                  type="checkbox"
                  checked={item?.checked}
                  onClick={() => checkItem(item)}
                  onChange={() => {}}
                />
                <label>{item?.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBox;
