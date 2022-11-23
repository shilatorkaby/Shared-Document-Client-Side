$("#create-new-button").on("click", async (event) => {
    console.log("hello");
    let title = $("#title").val() 
    if(title.length == 0){
        console.log("empty");
    }
});