import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const ProfileCard = async () => {
  const { userId } = auth();

  // Check if the user is authenticated
  if (!userId) return null;

  // Fetch the user from the database
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  // If user doesn't exist, return null
  if (!user) return null;

  // Fallback values for avatar and cover
  const userAvatar = user.avatar || "/noAvatar.png";
  const userCover = user.cover || "/noCover.png";

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
      {/* User Cover Image */}
      <div className="h-20 relative">
        <Image
          src={userCover}
          alt="User Cover"
          fill
          className="rounded-md object-cover"
        />
        {/* User Avatar */}
        <Image
          src={userAvatar}
          alt="User Avatar"
          width={48}
          height={48}
          className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
        />
      </div>

      <div className="h-20 flex flex-col gap-2 items-center">
        {/* User Name or Username */}
        <span className="font-semibold">
          {user.name && user.surname
            ? `${user.name} ${user.surname}`
            : user.username}
        </span>

        <div className="flex items-center gap-4">
          {/* Placeholder for Followers Avatars */}
          <div className="flex">
            {/* Replace these hardcoded URLs with real follower avatars when available */}
            <Image
              src="https://images.pexels.com/photos/19578755/pexels-photo-19578755/free-photo-of-woman-watching-birds-and-landscape.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt="Follower 1"
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
            <Image
              src="https://images.pexels.com/photos/19578755/pexels-photo-19578755/free-photo-of-woman-watching-birds-and-landscape.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt="Follower 2"
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
            <Image
              src="https://images.pexels.com/photos/19578755/pexels-photo-19578755/free-photo-of-woman-watching-birds-and-landscape.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              alt="Follower 3"
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
          </div>
          
          {/* Follower Count */}
          <span className="text-xs text-gray-500">
            {user._count.followers} Followers
          </span>
        </div>

        {/* My Profile Link */}
        <Link href={`/profile/${user.username}`}>
          <button
            className="bg-blue-500 text-white text-xs p-2 rounded-md"
            aria-label="Go to My Profile"
          >
            My Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
