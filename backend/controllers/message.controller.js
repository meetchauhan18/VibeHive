export const sendMessage = async (req, res) => {
  try {
    const { senderId } = req.id;
    const { receiverId } = req.params.id;
    const { message } = req.body;

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      // if conversation doesn't exist, create one
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }
    await Message.create({
      senderId,
      receiverId,
      conversationId: conversation._id,
      message,
    });

    return res
      .status(200)
      .json({ message: "Message sent successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};
