import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { createRecipe, getDiets } from "../../actions/actions";
import NavBar from "../NavBar/Navbar";

function validate(form) {
  let errors = {};
  if (!form.name) {
    errors.name = "Recipe name required";
  } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
    errors.name = "Recipe name cannot contain special characters or numbers";
  } else if (!form.summary) {
    errors.summary = "Recipe summary required";
  } else if (!form.steps) {
    errors.steps = "Recipe instructions required";
  } else if (
    form.image &&
    !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(form.image)
  ) {
    errors.image = "Invalid URL";
  }
  return errors;
}

export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.diets);

  const [form, setForm] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    steps: "",
    diets: [],
    image: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors(validate({ ...form, [e.target.name]: e.target.value }));
    console.log(e.target.value);
    console.log(errors);
  };

  //  const healthHandler=(e)=>{
  //   setForm({...form, healthScore: e.target.value})
  //  }

  const dietHandler = (e) => {
    if (e.target.checked) {
      console.log("hola checked");
      setForm({ ...form, diets: [...form.diets, e.target.value] });
    }
    if (!e.target.checked) {
      const aux = form.diets.filter((d) => d !== e.target.value);
      setForm({ ...form, diets: aux });
      console.log("hola no checked");
    }

    console.log(form.diets);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    
      dispatch(createRecipe(form));
      setForm({
        name: "",
        summary: "",
        healthScore: 0,
        steps: "",
        diets: [],
        image: "",
      });
      window.alert("RECIPE SUCCESFULLY CREATED ");
      history.push("/home");
    
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={(e) => submitHandler(e)}>
        <div>
          <label>Name:</label>
          <input
            type={"text"}
            name="name"
            key={"name"}
            required
            value={form.name}
            onChange={(e) => changeHandler(e)}
          ></input>
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Summary:</label>
          <textarea
            name="summary"
            required
            value={form.summary}
            onChange={(e) => changeHandler(e)}
          />
          {errors.summary && <p>{errors.summary}</p>}
        </div>
        <div>
          <label>Health Score: {form.healthScore}</label>
          <input
            value={form.healthScore}
            name="healthScore"
            type="range"
            min="0"
            max="100"
            step={1}
            onChange={(e) => changeHandler(e)}
          ></input>
        </div>
        <div>
          <label>How To:</label>
          <textarea
            name="steps"
            required
            value={form.steps}
            onChange={(e) => changeHandler(e)}
          />
          {errors.steps && <p>{errors.steps}</p>}
        </div>

        <div>
          <label> Select diet type:</label>

          {diets.map((d) => {
            return (
              <label key={d.id}>
                <input
                  type={"checkbox"}
                  key={d.id}
                  name="diets"
                  value={d.name}
                  onChange={(e) => dietHandler(e)}
                />
                {d.name}
              </label>
            );
          })}
        </div>
        <div>
          <label> Image URL:</label>
          <input
            type="url"
            name="image"
            placeholder="e.g.: https://example.com/example-content.jpg"
            value={form.image}
            onChange={(e) => changeHandler(e)}
          />
          {errors.image && <p>{errors.image}</p>}
        </div>
        <div>
          <button type="submit">CREATE!</button>
        </div>
      </form>
    </div>
  );
}
