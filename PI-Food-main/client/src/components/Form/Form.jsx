import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { createRecipe, getDiets } from "../../actions/actions";
import NavBar from "../NavBar/Navbar";
import styles from "./Form.module.css";

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
    <div className={styles.back}>
      <NavBar />
      <div className={styles.form}>
        <form onSubmit={(e) => submitHandler(e)}>
          <div className={styles.title}>
            <h2>Create your recipe:</h2>
          </div>
          <div className={styles.divind}>
            <div className={styles.text}>
              <label>Name:</label>
            </div>
            <input
              className={styles.inputsch}
              type={"text"}
              name="name"
              key={"name"}
              required
              value={form.name}
              onChange={(e) => changeHandler(e)}
            ></input>
            {errors.name && <p className={styles.errors}>{errors.name}</p>}
          </div>
          <div className={styles.divind}>
            <div className={styles.text}>
              <label>Summary:</label>
            </div>
            <textarea
              className={styles.inputsgr}
              name="summary"
              required
              value={form.summary}
              onChange={(e) => changeHandler(e)}
            />
            {errors.summary && (
              <p className={styles.errors}>{errors.summary}</p>
            )}
          </div>
          <div className={styles.divind}>
            <div className={styles.text}>
              <label>Health Score: {form.healthScore}</label>
            </div>
            <input
              className={styles.drag__bar}
              value={form.healthScore}
              name="healthScore"
              type="range"
              min="0"
              max="100"
              step={1}
              onChange={(e) => changeHandler(e)}
            ></input>
          </div>
          <div className={styles.divind}>
            <div className={styles.text}>
              <label>How To:</label>
            </div>
            <textarea
              className={styles.inputsgr}
              name="steps"
              required
              value={form.steps}
              onChange={(e) => changeHandler(e)}
            />
            {errors.steps && <p className={styles.errors}>{errors.steps}</p>}
          </div>

          <div className={styles.divind}>
            <div className={styles.text}>
              <label> Select diet type:</label>
            </div>
            <div className={styles.divdiets}>
              {diets.map((d) => {
                return (
                  <label key={d.id}>
                    <input
                      className={styles.inputdiet}
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
          </div>
          <div className={styles.divind}>
            <div className={styles.text}>
              <label> Image URL:</label>
            </div>
            <input
              className={styles.inputsch}
              type="url"
              name="image"
              placeholder="e.g.: https://example.com/example-content.jpg"
              value={form.image}
              onChange={(e) => changeHandler(e)}
            />
            {errors.image && <p className={styles.errors}>{errors.image}</p>}
          </div>
          <div className={styles.divind}>
            <button className={styles.btn} type="submit">
              CREATE!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
