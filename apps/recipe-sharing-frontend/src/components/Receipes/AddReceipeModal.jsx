import { Button, Col, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import CustomButton from "../Button/CustomButton";
import { useToggle } from "../../utils/hooks/useToggle";
import AddIngredientModal from "./AddIngredientModal";
import { IoRemoveCircle } from "react-icons/io5";
import { nanoid } from "@reduxjs/toolkit";
const AddPostModal = ({ open, close }) => {
  const [openIngredientModal, toggleIngredientModal] = useToggle();
  const [ingredients, setIngredients] = useState([]);
  function addIngredient(values) {
    setIngredients((prev) => {
      return [...prev, { ...values, id: nanoid() }];
    });
  }
  return (
    <Modal title="Add Recipe" open={open} onCancel={close} footer={null}>
      {openIngredientModal && (
        <AddIngredientModal
          open={openIngredientModal}
          close={toggleIngredientModal}
          addIngredient={addIngredient}
        />
      )}
      <div className="mb-[1rem] py-4 relative bg-white rounded-xl cursor-pointer">
        <Row gutter={16}>
          <Col xs={24}>
            <label htmlFor="recipeName">Recipe Name</label>
            <Input
              name={"recipeName"}
              id="recipeName"
              placeholder={"Enter Recipe Name"}
              className="h-[41px] mt-2"
            />
          </Col>
          <Col xs={24} className="mt-5">
            <label htmlFor="recipeDescription">Recipe Description</label>
            <Input.TextArea
              name={"recipeName"}
              placeholder={"Enter Recipe Name"}
              className="mt-2"
              rows={3}
            />
          </Col>
          <Col xs={24} className="mt-5">
            <Button
              className="flex justify-center items-center mt-5 border border-primary text-primary h-[41px] w-full"
              onClick={toggleIngredientModal}
            >
              <span>+ Add Ingredient</span>
            </Button>

            <h4 className="font-bold text-xl mt-5 mb-3">Ingredients</h4>
            <ul className="flex flex-col gap-2">
              {ingredients.map((item) => {
                return (
                  <li className="list-disc ml-3 relative">
                    <span>{`${item.quantity} ${item.unit} ${item.ingredientName}`}</span>
                    <span className="absolute right-0 top-[50%] translate-y-[-50%]">
                      <IoRemoveCircle
                        color="red"
                        onClick={() => {
                          const newIngredients = ingredients.filter(
                            (ingredient) => ingredient.id !== item.id
                          );
                          setIngredients(newIngredients);
                        }}
                      />
                    </span>
                  </li>
                );
              })}
            </ul>
          </Col>
        </Row>
      </div>
      <div>
        <CustomButton>Add Recipe</CustomButton>
      </div>
    </Modal>
  );
};

export default AddPostModal;
