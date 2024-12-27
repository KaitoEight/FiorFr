import React, { useState } from "react";
import axios from "axios";

const AddFood = () => {
  const [form, setForm] = useState({ name: "", description: "", price: "", imageUrl: "", dishType: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/createFood", form);
      if (response?.data) {
        alert("Món ăn đã được thêm thành công!");
        setForm({ name: "", description: "", price: "", imageUrl: "", dishType: "" });
      }
    } catch (error) {
      console.error("Error uploading food:", error);
      alert("Thêm món ăn thất bại.");
    }
  };

  return (
    <div>
      <h1>Thêm món ăn</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên món ăn:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Mô tả:</label>
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Giá:</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Hình ảnh URL:</label>
          <input type="text" name="imageUrl" value={form.imageUrl} onChange={handleChange} />
        </div>
        <div>
          <label>Loại món ăn:</label>
          <select name="dishType" value={form.dishType} onChange={handleChange} required>
            <option value="">Chọn loại</option>
            <option value="Veg">Chay</option>
            <option value="Non-Veg">Không chay</option>
          </select>
        </div>
        <button type="submit">Thêm món ăn</button>
      </form>
    </div>
  );
};

export default AddFood;
