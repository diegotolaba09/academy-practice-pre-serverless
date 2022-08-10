import axios from "axios";

const cb = (data, res, next) => {
  try {
    axios({
      method: "POST",
      url: process.env.WEBHOOK_URL,
      data,
    });

    if (data.status >= 400) {
      throw data;
    }

    res.send(data);
  } catch (err) {
    next(err);
  }
};

export { cb };
