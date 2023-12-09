// update user data via PUT method

export const PUT = async (req, res) => {
  // get user id from request
  const { id } = req.query;
  // get data from request body
  const data = await req.json();
  // connect to database
  await dbConnect();
  // find user by id and update
  const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  // return updated user
  return NextResponse.json({ data: updatedUser });
}