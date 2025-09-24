const BlogCreate = {
  title: "required|string",
  content: "required|string",
  createdBy: "required|string",
};

// createdBy poleto e immutable - sto znaci ne se promenuva nikogas
const BlogUpdate = {
  title: "string",
  content: "string",
};
