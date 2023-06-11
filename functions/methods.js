export const  includeArray = (mainList = [], secondList = []) => {
   
    let result = true;

    secondList.forEach((item) => {
        if (!mainList.includes(item)) result = false;
    });

    return result;
};
