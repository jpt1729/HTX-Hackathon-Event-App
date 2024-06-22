"use server";

export async function editMCAction(prevState, formData){
    const optionsNames = [];
    
    for (let [name] of formData) {
      if (!optionsNames.includes(name) && !(name === 'title')) {
        optionsNames.push(name);
      }
    }
    const title = formData.get("title")
    if (title === "") {
        return {
            status: "error",
            message: "",
            errors: {
                title: "Must have title"
            }
        }
    }
    const updatedMC = {
        title: title,
        content: {
            options: optionsNames.map((optionName) => {
                return formData.get(optionName)
            })
        }
    }
    console.log(updatedMC)
    return {
        status: "",
        message: "",
        errors: {}
    }
}
export async function editQAAction(prevState, formData){
    const title = formData.get("title")
    const question = formData.get("question")
    if (title === "") {
        return {
            status: "error",
            message: "",
            errors: {
                title: "Must have title"
            }
        }
    }
    const updatedQA = {
        title: title,
        content: {
            question: question
        }
    }
    console.log(updatedQA)
    return {
        status: "",
        message: "",
        errors: {}
    }
}

export async function editMDAction(prevState, formData){
    const title = formData.get("title")
    const question = formData.get("question")
    if (title === "") {
        return {
            status: "error",
            message: "",
            errors: {
                title: "Must have title"
            }
        }
    }
    const updatedQA = {
        title: title,
        content: {
            question: question
        }
    }
    console.log(updatedQA)
    return {
        status: "",
        message: "",
        errors: {}
    }
}