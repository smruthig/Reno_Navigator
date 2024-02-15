<p align="center">
    <h1 align="center">Reno Navigator</h1>
</p>
<p align="center">
    <em><code>One platform to manage all your homemakeover magic!</code></em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/last-commit/smruthig/RenoNavigator?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/smruthig/RenoNavigator?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/smruthig/RenoNavigator?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" alt="PostCSS">
	<img src="https://img.shields.io/badge/PostgreSQL-DD3735.svg?style=flat&logo=PostgreSQL&logoColor=white" alt="Autoprefixer">
	<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat&logo=YAML&logoColor=white" alt="YAML">
	<img src="https://img.shields.io/badge/Jest-C21325.svg?style=flat&logo=Jest&logoColor=white" alt="Jest">
	<img src="https://img.shields.io/badge/D-B03931.svg?style=flat&logo=D&logoColor=white" alt="D">
	<img src="https://img.shields.io/badge/Webpack-8DD6F9.svg?style=flat&logo=Webpack&logoColor=black" alt="Webpack">
	<img src="https://img.shields.io/badge/Redux-764ABC.svg?style=flat&logo=Redux&logoColor=white" alt="Redux">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/Progress-5CE500.svg?style=flat&logo=Progress&logoColor=white" alt="Progress">
	<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<br>
	<img src="https://img.shields.io/badge/SemVer-3F4551.svg?style=flat&logo=SemVer&logoColor=white" alt="SemVer">
	<img src="https://img.shields.io/badge/SVGO-3E7FC1.svg?style=flat&logo=SVGO&logoColor=white" alt="SVGO">
	<img src="https://img.shields.io/badge/Python-3776AB.svg?style=flat&logo=Python&logoColor=white" alt="Python">
	<img src="https://img.shields.io/badge/Lodash-3492FF.svg?style=flat&logo=Lodash&logoColor=white" alt="Lodash">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/Ajv-23C8D2.svg?style=flat&logo=Ajv&logoColor=white" alt="Ajv">
	<img src="https://img.shields.io/badge/Buffer-231F20.svg?style=flat&logo=Buffer&logoColor=white" alt="Buffer">
	<img src="https://img.shields.io/badge/Immer-00E7C3.svg?style=flat&logo=Immer&logoColor=white" alt="Immer">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
	<img src="https://img.shields.io/badge/Flask-000000.svg?style=flat&logo=Flask&logoColor=white" alt="Flask">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
</p>
<hr>

##  Quick Links

> - [ Overview](#overview)
> - [ Features](#features)
> - [ Database Design](#database-design)
> - [ Repository Structure](#repository-structure)
> - [ Getting Started](#getting-started)
>   - [ Set up the React App](#set-up-the-react-app)
>   - [Set up the Flask App](#set-up-the-flask-app)

---

##  Overview

RenoNavigator allows companies taking on home renovation projects to organize and manage key information like project details, sites, employees, contractors, customers, rooms, designs, products, payments and more.

The application features a database to store all critical project data which can be accessed via Python-Flask powered APIs. The frontend allows easy access and management of this data through interactive React interfaces.

---

##  Features

- **Database Management:**
  - Store information related to projects, sites, employees, contractors, customers, rooms, designs, products, etc.

- **CRUD Operations:**
  - Implement Create, Read, Update, and Delete operations for managing all data.

- **Dashboards, Reports, and Analytics:**
  - Generate dashboards, reports, and analytics for projects, sales, and profit.

- **Custom Design Creation:**
  - Allow users to create custom designs or choose from pre-made room designs.

- **Recommendation System:**
  - Provide contractor and product recommendations based on project details.

- **Payment Tracking:**
  - Track payments related to projects.

- **Remnant Fee Calculations:**
  - Calculate remnant fees for services rendered.

- **Customer Feedback Collection:**
  - Collect and manage customer feedback.

---

## Database Design

![image (3)](https://github.com/smruthig/RenoNavigator/assets/75429779/6cdfb893-b2bb-4054-a45d-7fb1fb0e5576)


---

##  Repository Structure

```sh
└── RenoNavigator/
    ├── Interior design & decor2.erdplus.erdplus.erdplus
    ├── Interior design & decorRelSch.erdplus.erdplus.erdplus
    ├── Pipfile
    ├── README.md
    ├── assignment 1
    │   ├── Assignment-1.pdf
    │   ├── ERDiagram.erdplus
    │   └── Initial plan.pdf
    ├── assignment 2
    │   ├── Assignment-2.pdf
    │   ├── create.sql
    │   └── insert.sql
    ├── assignment 3
    │   ├── Assignment 3.pdf
    │   ├── front_end.md
    │   ├── grant.sql
    │   ├── queries.sql
    │   └── user.sql
    ├── flask-app
    │   ├── .gitignore
    │   ├── Pipfile
    │   ├── Pipfile.lock
    │   ├── app.py
    │   └── routes
    │       ├── auth.py
    │       ├── customer.py
    │       ├── designer.py
    │       └── projectManager.py
    └── react-app
        ├── .gitignore
        ├── README.md
        ├── package-lock.json
        ├── package.json
        ├── public
        │   ├── favicon.ico
        │   ├── index.html
        │   ├── logo192.png
        │   ├── logo512.png
        │   ├── manifest.json
        │   └── robots.txt
        ├── src
        │   ├── App.test.tsx
        │   ├── App.tsx
        │   ├── Routes.tsx
        │   ├── components
        │   │   ├── Login.tsx
        │   │   ├── SignUp.tsx
        │   │   ├── Table.tsx
        │   │   ├── designer
        │   │   │   ├── DesignerProjectDetails.tsx
        │   │   │   └── ProjectList.tsx
        │   │   └── projectManager
        │   │       ├── AddProjectForm.tsx
        │   │       ├── ProjectDetails.tsx
        │   │       └── ProjectList.tsx
        │   ├── index.tsx
        │   ├── react-app-env.d.ts
        │   ├── reportWebVitals.ts
        │   ├── setupTests.ts
        │   ├── store
        │   │   └── store.ts
        │   ├── styles
        │   │   ├── App.css
        │   │   └── index.css
        │   └── utils
        │       ├── axios.ts
        │       ├── config.ts
        │       ├── errorToast.ts
        │       └── formatDate.ts
        ├── target
        │   └── npmlist.json
        ├── tsconfig.json
        └── yarn.lock
```

---

##  Getting Started

### Set up the React App
- first ```cd react-app```
- install yarn if not already installed
- run ```yarn install```
- run ```yarn start```
- visit http://localhost:3000/

#### To add packages to the React App
run ```yarn add <package_name>```

### Set up the Flask App
- first ```cd flask-app```
- install pipenv using ```pip install pipenv```
- ```pipenv install``` -> installs all dependencies
- ```pipenv shell```
- run ```python3 app.py```
- visit http://localhost:5000/

#### To add packages to the Flask App
run ```pipenv install <package_name>```

---
