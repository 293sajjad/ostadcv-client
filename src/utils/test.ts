export const containsPersian = (str: string) => {
    const persianRegex = /[\u0600-\u06FF\u0750-\u077F]/;
    return persianRegex.test(str);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const strongPassValidation = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback("لطفاً یک رمز عبور وارد کنید.");
    } else if (value.length < 8) {
        callback("رمز عبور باید حداقل ۸ کاراکتر باشد.");
    } else if (!/[a-z]/.test(value)) {
        callback("رمز عبور باید حداقل شامل یک حرف کوچک انگلیسی باشد.");
    } else if (!/[A-Z]/.test(value)) {
        callback("رمز عبور باید حداقل شامل یک حرف بزرگ انگلیسی باشد.");
    } else if (!/\d/.test(value)) {
        callback("رمز عبور باید حداقل شامل یک عدد باشد.");
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        callback("رمز عبور باید حداقل شامل یک کاراکتر ویژه باشد.");
    } else {
        callback();
    }
};
