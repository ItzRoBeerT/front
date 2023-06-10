export const  includeArray = (mainList = [], secondList = []) => {
   
    let result = true;

    console.log({ mainList, secondList });
    secondList.forEach((item) => {
        if (!mainList.includes(item)) result = false;
    });

    return result;
};
