import { User } from "../schemas/User";

interface CreateUserDTO {
  email: string;
  socket_id: string;
  avatar: string;
  name: string;
}

class CreateUserService {
  async execute({ email, socket_id, avatar, name }: CreateUserDTO) {
    const userAlreadyExists = await User.findOne({
      email,
    }).exec();

    if (userAlreadyExists) {
      const user = await User.findOneAndUpdate(
        {
          _id: userAlreadyExists._id,
        },
        {
          $set: { socket_id, avatar, name },
        },
        {
          new: true,
        }
      );
      return user;
    } else {
      const user = User.create({
        email,
        socket_id,
        avatar,
        name,
      });

      return user;
    }
  }
}

export { CreateUserService };
