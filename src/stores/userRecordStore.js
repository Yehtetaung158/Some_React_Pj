import toast from "react-hot-toast";
import { create } from "zustand";

const useRecordStore = create((set) => ({
  records: [],
  addRecord: (record) =>
    set((state) => {
      const isExist = state.records.some(
        (r) => r.product_id === record.product_id
      );
      if (isExist) {
        toast("Product Already Exist.So quantity heaved be added");
        return {
          records: state.records.map((r) =>
            r.product_id === record.product_id
              ? { ...r, quantity: r.quantity + record.quantity }
              : r
          ),
        };
      }
      return {
        records: [...state.records, record],
      };
    }),

  removeRecord: (id) =>
    set((state) => ({
      records: state.records.filter((r) => r.id !== id),
    })),

  // changeRecordQuantity: (id, quantity) =>
  //   set((state) => (console.log({
  //     records: state.records.map((r) => (r.id === id ? { ...r, quantity } : r)),
  //   }))),
  changeRecordQuantity: (id, quantity) => {
    set((state) => ({
      records: state.records.map((r) =>
        r.id === id ? { ...r, quantity: r.quantity + quantity } : r
      ),
    }));
  },

  updateRecord: (record) =>
    set((state) => ({
      records: state.records.map((r) => (r.id === record.id ? record : r)),
    })),
}));

export default useRecordStore;
