import {component$} from "@builder.io/qwik";
import {Link} from "@builder.io/qwik-city";
import {EXTERNAL_LINK} from "~/api";
import {IMBDIcon} from "~/components/icons/imbd-icon";
import {TwitterIcon} from "~/components/icons/twitter-icon";
import {InstagramIcon} from "~/components/icons/instagram-icon";
import {FacebookIcon} from "~/components/icons/facebook-icon";
import {PersonExternalIDS} from "~/api/models";

interface SocialNetworkProps {
    externalIDS: PersonExternalIDS | undefined
}

export const SocialNetwork = component$((props: SocialNetworkProps) => {
    const {externalIDS} = props;

    return <ul class={`flex items-center`}>
                {
                    externalIDS?.imdb_id
                        ? <li>
                            <Link target={"_blank"}
                                  href={`${EXTERNAL_LINK.IMDB}/${externalIDS?.imdb_id}`}>
                                <IMBDIcon width={32} height={32}/>
                            </Link>
                        </li>
                        : ''
                }

                {
                    externalIDS?.twitter_id
                        ? <li class={`ml-[-4px]`}>
                            <Link target={"_blank"}
                                  href={`${EXTERNAL_LINK.TWITTER}/${externalIDS?.twitter_id}`}>
                                <TwitterIcon width={32} height={32}/>
                            </Link>
                        </li>
                        : ''
                }

                {
                    externalIDS?.instagram_id
                        ? <li class={`ml-[4px]`}>
                            <Link target={"_blank"}
                                  href={`${EXTERNAL_LINK.INSTAGRAM}/${externalIDS?.instagram_id}`}>
                                <InstagramIcon width={26} height={26}/>
                            </Link>
                        </li>
                        : ''
                }

                {
                    externalIDS?.facebook_id
                        ? <li class={`ml-[4px]`}>
                            <Link target={"_blank"}
                                  href={`${EXTERNAL_LINK.FACEBOOK}/${externalIDS?.facebook_id}`}>
                                <FacebookIcon width={32} height={32}/>
                            </Link>
                        </li>
                        : ''
                }
    </ul>
})
