export async function getProducts(url) {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.log("faild request");
    }
  } catch (error) {
    console.log("An error occured, please try again!", error);
  }
}
