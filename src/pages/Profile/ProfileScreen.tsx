import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import {
  deleteFollow,
  getFolloweesById,
  getFollowersById,
  getProfileByUsername,
  insertFollow,
} from "../../../supabase/profileFunctions";
import Avatar from "../../components/avatar/Avatar";
import { Session, User } from "@supabase/supabase-js";
import SessionProps from "../../interfaces/auth.interface";
import arraysEqual from "../../utils/arraysEqual";
import { signOut } from "../../../supabase/auth.functions";
import Button from "../../components/button/Button";
import "./ProfleScreen.css";
import RecipeCard from "../../components/recipeCard/RecipeCard";
import { getAllRecipesByUserId } from "../../../supabase/recipe.functions";

export default function FollowerProfileScreen({
  userProps,
  sessionProps,
}: SessionProps) {
  const navigate = useNavigate();
  const { usernameParam } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<User | null>(userProps);
  const [session, setSession] = useState<Session | null>(sessionProps);

  const [id, setId] = useState<string | undefined>("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const [followers, setFollowers] = useState<string[]>([]);
  const [followees, setFollowees] = useState<string[]>([]);

  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const [recipes, setRecipes] = useState<any[]>([]);

  const goBack = () => {
    navigate(-1);
  };

  const navigateToEditProfile = () => {
    navigate("/profile/edit");
  };

  const navigateToAddRecipe = () => {
    navigate("/add-recipe");
  };

  const navigateToFollowers = () => {
    navigate("followers");
  };

  const navigateToFollowees = () => {
    navigate("followees");
  };

  async function handleSignOut() {
    signOut()
      .then(() => {
        console.log("User Logged Out");
        navigate("/");
      })
      .then(() => {
        window.location.reload();
      });
  }

  async function handleFollow() {
    console.log("Followed");
    if (isFollowing && user?.id && id) {
      await deleteFollow(user.id, id);
    } else if (!isFollowing && user?.id && id) {
      await insertFollow(user.id, id);
    }
    if (id) {
      getFollowersById(id).then((data) => {
        const newFollowers = data?.map((follower) => follower.follower_id);
        if (newFollowers && !arraysEqual(newFollowers, followers)) {
          setFollowers(newFollowers);
        }
      });
    }
  }

  useEffect(() => {
    setSession(sessionProps);
    setUser(userProps);
    console.log("user", user);
  }, [session, sessionProps, user, userProps]);

  useEffect(() => {
    if (usernameParam) {
      getProfileByUsername(usernameParam).then((data) => {
        console.log("data", data);

        setId(data && data[0]?.profile_id);
        setUsername(data && data[0]?.username);
        setBio(data && data[0]?.bio);
        setAvatarUrl(data && data[0]?.avatar_url);
        setIsLoading(false);
      });
    }
  }, [usernameParam, id, username, bio, avatarUrl]);

  useEffect(() => {
    if (id) {
      getFollowersById(id).then((data) => {
        const newFollowers = data?.map((follower) => follower.follower_id);
        if (newFollowers && !arraysEqual(newFollowers, followers))
          setFollowers(newFollowers);
        if (user?.id && followers.includes(user.id)) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      });
    }
  }, [isFollowing, followers, id]);

  useEffect(() => {
    if (id) {
      getFolloweesById(id).then((data) => {
        const newFollowees = data?.map((followee) => followee.followee_id);
        if (newFollowees && !arraysEqual(newFollowees, followees))
          setFollowees(newFollowees);
      });
    }
  }, [followees, id]);

  useEffect(() => {
    if (id) {
      getAllRecipesByUserId(id).then((data) => {
        console.log("recipes", data);
        data && setRecipes(data);
      });
    }
  }, [id]);

  return (
    <div className="profile-page">
      {isLoading ? (
        <p>Loading...</p>
      ) : id == null ? (
        <h1>No user found</h1>
      ) : (
        <>
          <section className="profile-info">
            <div className="profile-avatar">
              <Avatar imageUrl={avatarUrl} size={160} />
            </div>
            <div>
              <div className="profile-title">
                <p className="profile-username">{username}</p>
                {id === user?.id ? (
                  <div className="profile-buttons">
                    <Button
                      text="Edit Profile"
                      onClick={navigateToEditProfile}
                      style="button"
                    />
                    <Button
                      text="Log Out"
                      onClick={handleSignOut}
                      style="button"
                    />
                  </div>
                ) : (
                  <div className="profile-buttons">
                    {isFollowing ? (
                      <Button
                        text="Unfollow"
                        onClick={handleFollow}
                        style="button"
                      />
                    ) : (
                      <Button
                        text="Follow"
                        onClick={handleFollow}
                        style="button"
                      />
                    )}
                    <Button text="Go Back" onClick={goBack} style="button" />
                  </div>
                )}
              </div>
              <div className="profile-stats">
                <h4 className="profile-stats-item">
                  <b>{recipes.length}</b> posts
                </h4>
                <h4
                  onClick={navigateToFollowers}
                  className="profile-stats-item"
                >
                  <b>{followers.length}</b> followers
                </h4>
                <h4
                  onClick={navigateToFollowees}
                  className="profile-stats-item"
                >
                  <b>{followees.length}</b> following
                </h4>
              </div>
              <p className="profile-bio">{bio}</p>
            </div>
          </section>
          <h2 className="recipe-heading">Recipes</h2>

          <hr />
          <section style={{ display: "flex", justifyContent: "center" }}>
            {/*id === user?.id ? (
              <button onClick={navigateToAddRecipe}>Add Recipe</button>
            ) : null*/}
            <div className="recipe-grid">
              {recipes.map((recipe) => (
                <Link
                  to={`/${username}/${recipe.title}`}
                  key={recipe.created_at}
                  style={{ textDecoration: "none" }}
                >
                  <RecipeCard
                    key={recipe.recipe_id}
                    imageUrl={recipe.image_url}
                    title={recipe.title}
                    subheader={recipe.subheader}
                  />
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
