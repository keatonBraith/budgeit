import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTransactions } from "../redux/transactionReducer";
import Transaction from "./Transaction";
import { v4 as randomString } from "uuid";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";

const Transactions = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [pic, setPic] = useState("");
  const [receipt, setReceipt] = useState({
    isUploading: false,
    url: "http://via.placeholder.com/450x450",
  });
  const [input, setInput] = useState({
    date: transactions.date,
    description: transactions.description,
    category: transactions.category,
    amount: transactions.amount,
    img_url: transactions.img_url,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const getSignedRequest = ([file]) => {
    setReceipt({ isUploading: true });
    // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
    const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;

    // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
    axios
      .get("/api/signs3", {
        params: {
          "file-name": fileName,
          "file-type": file.type,
        },
      })
      .then((response) => {
        const { signedRequest, url } = response.data;
        setPic(url);
        uploadFile(file, signedRequest, url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };

    axios
      .put(signedRequest, file, options)
      .then((response) => {
        setReceipt({ isUploading: false, url });
        console.log("upload", response);
        axios.post("/api/img", { pic: url });
      })
      .catch((err) => {
        setReceipt({
          isUploading: false,
        });
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${err.stack}`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  const getTransactions = () => {
    axios
      .get(`/api/trans/${props.match.params.monthId}`)
      .then((res) => {
        setTransactions(res.data);
        props.getTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const handleClearInput = (event) => {
    setTransactions([]);
    setInput({
      date: "",
      description: "",
      category: "",
      amount: "",
      img_url: "",
    });
  };

  const onClick = (event) => {
    addTransaction();
    handleClearInput();
    setPic("");
  };

  const addTransaction = () => {
    console.log(input.category);
    axios
      .post(`/api/trans/${props.match.params.monthId}`, {
        date: input.date,
        description: input.description,
        category: input.category,
        amount: input.amount,
        img_url: pic,
      })
      .then((res) => {
        setTransactions(res.data);
        getTransactions();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editTransaction = (
    id,
    date,
    description,
    category,
    amount,
    img_url
  ) => {
    axios
      .put(`/api/trans/${id}/${props.match.params.monthId}`, {
        date,
        description,
        category,
        amount,
        img_url,
      })
      .then((res) => {
        setTransactions(res.data);
        getTransactions();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTransaction = (id) => {
    axios
      .delete(`/api/trans/${id}/${props.match.params.monthId}`)
      .then((res) => {
        setTransactions(res.data);
        getTransactions();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="trans-main">
      {console.log(props)}
      <Link
        className="budget-link"
        to={`/budget/${props.match.params.monthId}`}
      >
        Back to Budget
      </Link>
      <div className="add-trans">
        <button onClick={onClick}>
          <i className="fa fa-floppy-o"></i>
          <span className="save-trans">Save Transaction</span>
        </button>
        <input
          className="date"
          name="date"
          placeholder="Date"
          value={input.date}
          onChange={handleChange}
        />
        <input
          className="description"
          name="description"
          placeholder="Description"
          value={input.description}
          onChange={handleChange}
        />
        <input
          className="category"
          name="category"
          placeholder="Category"
          value={input.category}
          onChange={handleChange}
        />
        <input
          className="amount"
          name="amount"
          placeholder="Amount"
          value={input.amount}
          onChange={handleChange}
        />
        {pic === "" ? (
          <div className="dropzone">
            <Dropzone
              onDropAccepted={getSignedRequest}
              url={receipt.url}
              className="img-input"
              accept="image/*"
              multiple={false}
            >
              {receipt.isUploading ? (
                <GridLoader className="img-input" />
              ) : (
                <p className="img-input">Click to Add Receipt</p>
              )}
            </Dropzone>
          </div>
        ) : (
          <input
            className="receipt"
            name="receipt"
            placeholder="Img url"
            value={pic}
            onChange={handleChange}
          />
        )}
      </div>
      <div className="table">
        <div className="table-row">
          <div className="table-col">Date</div>
          <div className="table-col">Description</div>
          <div className="table-col">Category</div>
          <div className="table-col">Amount</div>
          <div className="table-col">Receipt</div>
        </div>
      </div>
      <div className="transactions">
        {transactions.map((transaction, index) => {
          return (
            <Transaction
              editTransaction={editTransaction}
              deleteTransaction={deleteTransaction}
              uploadFile={uploadFile}
              getSignedRequest={getSignedRequest}
              transaction={transaction}
              receipt={receipt}
              pic={pic}
              index={index}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getTransactions })(Transactions);
