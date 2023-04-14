from app.models import db, Story, environment, SCHEMA
from sqlalchemy.sql import text


def seed_story():
    story1 = Story(
        user_id = 1,
        title = 'The Echoes of Chronos',
        content = '''In the year 2278, humankind had made extraordinary advances in technology, propelling society into a new era of prosperity and growth. Among the greatest achievements was the development of time travel, a feat accomplished by the renowned scientist, Dr. Aria Kane. However, this monumental breakthrough came with its own set of rules and restrictions, as meddling with the past could lead to disastrous consequences.

                Dr. Kane's invention, known as the Chronos Echo, allowed individuals to observe the past without directly interacting with it, ensuring the timeline remained unaltered. This revolutionary device enabled historians, researchers, and curious minds to access the depths of human history in a way never before possible.

                One day, Dr. Kane received a mysterious message from an anonymous sender. The message contained coordinates and a date, along with a cryptic warning: "Discover the truth, but beware the ripples." Intrigued and unable to resist the challenge, Dr. Kane decided to investigate the sender's intentions by using the Chronos Echo to visit the specified date and location.

                The coordinates led her to the year 1958, in a small, seemingly insignificant town called Havenbrooke. As she observed the town's daily life through the lens of the Chronos Echo, Dr. Kane noticed a peculiar pattern of events. People appeared to be going about their routines in a mechanical, almost robotic manner. It was as if they were all under some form of external control.

                The more Dr. Kane observed, the more she grew convinced that something was amiss. Although she could not interact with the past, she was determined to uncover the truth behind the town's peculiar behavior. She spent days analyzing the patterns and searching for clues, eventually stumbling upon a hidden laboratory on the outskirts of Havenbrooke.

                The laboratory belonged to a brilliant but reclusive scientist named Dr. Cornelius Maxwell. Dr. Kane watched as Dr. Maxwell conducted strange experiments on the townspeople, implanting devices in their brains that allowed him to control their actions. It appeared that Dr. Maxwell was using the citizens of Havenbrooke as test subjects for a larger, more sinister plan.

                Dr. Kane knew she could not directly intervene in the past, but she couldn't stand idly by as the people of Havenbrooke suffered. She had to find a way to stop Dr. Maxwell without disrupting the timeline. As she pondered her options, Dr. Kane noticed a young woman named Elsie, who seemed to be immune to Dr. Maxwell's control.

                Dr. Kane watched as Elsie covertly observed Dr. Maxwell's actions and recorded his experiments in a journal. She realized that Elsie was the key to stopping Dr. Maxwell and preserving the timeline. If she could find a way to subtly guide Elsie in the right direction, perhaps she could put an end to Dr. Maxwell's reign of terror without directly interfering in the past.

                Over the following weeks, Dr. Kane carefully monitored Elsie's movements, leaving subtle clues and nudges that would eventually lead her to discover the true extent of Dr. Maxwell's experiments. Guided by Dr. Kane's invisible hand, Elsie grew bolder, gathering evidence of Dr. Maxwell's wrongdoings and rallying the townspeople to stand against him.

                As Elsie's resistance gained momentum, Dr. Maxwell became increasingly desperate to maintain control. In a last-ditch effort, he decided to use his mind-control technology on a global scale, hoping to enslave the entire human race. However, he underestimated the power of Elsie's resilience and the strength of the townspeople, who had come together to fight for their freedom.

                In a climactic showdown, Elsie and the citizens of Havenbrooke stormed Dr. Maxwell's laboratory, determined to dismantle his mind-control technology and free themselves from his grasp. As they confronted the mad scientist, a fierce battle ensued, with Dr. Maxwell using every trick and weapon at his disposal to retain control.

                Dr. Kane, watching from the future, held her breath, knowing that the outcome of this battle would determine the fate of not only Havenbrooke but potentially the entire world. With each passing moment, the tension grew, and she feared that any misstep could create disastrous ripples through time.

                Despite the odds, Elsie's courage and determination proved to be an unstoppable force. With the help of the townspeople, she managed to outwit Dr. Maxwell, destroy his mind-control devices, and ultimately bring him to justice. The citizens of Havenbrooke were finally freed from his control, and the timeline remained intact.

                As Dr. Kane returned to her own time, she couldn't help but feel a deep sense of relief and admiration for Elsie and the people of Havenbrooke. Their bravery had prevented a potentially catastrophic future, and their story was a testament to the power of unity and the indomitable human spirit.

                However, the mysterious message that had led her to Havenbrooke still weighed heavily on Dr. Kane's mind. Who had sent it, and how did they know about the events that transpired in the past? As she pondered these questions, a chilling thought crossed her mind: could someone else possess the technology to manipulate time, just as she did?

                Determined to uncover the truth, Dr. Kane dedicated herself to investigating the origins of the message and the potential existence of other time-traveling individuals. Along the way, she would encounter new allies and adversaries, delve into the depths of history, and grapple with the ethics and consequences of her own invention.

                As the saga of the Echoes of Chronos unfolded, Dr. Aria Kane would be forced to confront the true power of time and the responsibility that came with wielding it. Her journey would take her to the far reaches of human history and beyond, challenging her beliefs, her resolve, and her understanding of the very fabric of reality.

                Through her adventures, Dr. Kane would learn that the greatest power did not lie in the ability to manipulate time, but in the strength of the human spirit to overcome adversity and shape its own destiny. The echoes of Chronos would reverberate through the ages, a reminder of the interconnectedness of all things and the potential for both greatness and destruction that resided within each of us.''',
        image = 'https://i.ibb.co/8DGT1mJ/DALL-E-2023-04-14-12-59-12.png'



    )
    story2 = Story(
        user_id = 1,
        title = 'The Whispering Shards',
        content = ''' In the year 3076, a celestial event known as the Great Convergence altered the very fabric of reality. The veil between the realms of magic and technology thinned, allowing the two worlds to bleed into one another. The people of the planet Gaianox watched as the skies ignited with the shimmering light of the Cosmic Cascade, signaling the birth of a new era.

I. The Rift

In the quaint village of Elmsmere, nestled between rolling hills and towering forests, a young woman named Lyra gazed at the sky with a mix of awe and trepidation. As a technomancer, she possessed the rare ability to manipulate both magic and technology. As the Cosmic Cascade grew brighter, so did her powers.

The village council, wary of the unpredictable changes, tasked Lyra with investigating the phenomena. Armed with her trusty toolkit and an enchanted hoverboard, she set off to the nearest city, Lumena, where a mysterious rift had appeared.

The city buzzed with activity as people from all walks of life attempted to understand the phenomenon. The rift hovered above a central square, tendrils of energy snaking from its center and weaving into the very fabric of the world around it.

As Lyra approached, a deep, resonant hum filled her ears. She felt an invisible force tug at her very essence, urging her toward the rift. She hesitated, her heart pounding in her chest. With a deep breath, she extended her hand, allowing her technomancer abilities to connect with the rift.

An explosion of light and sound erupted around her, and the world went black.

II. The Shards

Lyra awoke in an unfamiliar landscape. She found herself in a cavernous chamber, filled with towering crystal formations that glowed in a mesmerizing array of colors. As she explored, she noticed that the crystals emitted a faint, ethereal whisper. The voices seemed to beckon her, as though they had a story to tell.

Cautiously, she approached one of the larger shards, its surface pulsating with a deep, indigo hue. She placed her hand upon the crystal, and the whispers grew louder. Images flashed before her eyes, an ancient tale unfurling in her mind.

The shard revealed a story of a once-unified world, torn asunder by the catastrophic event known as the Sundering. The two halves of this world, the realms of magic and technology, were split, each developing independently of the other. For eons, they existed side by side, parallel yet unaware of each other's presence.

The Great Convergence, the shard whispered, was a cosmic event that could heal the sundered world, bringing magic and technology together once more. But it would require a being capable of bridging the gap between realms, someone with the power to wield both the arcane and the mechanical. Lyra knew that she was that being, the key to uniting the two realms.

As she listened, the whispering shards revealed an ancient prophecy, speaking of a hero who would forge a new path and reunite the fractured worlds. Lyra, feeling the weight of destiny upon her shoulders, vowed to fulfill the prophecy and restore balance to the universe.

III. The Quest

Lyra returned to the rift and emerged in Lumena, her resolve strengthened. She gathered allies, assembling a ragtag team of adventurers with skills that spanned the realms of magic and technology. Among them were Tarius, a cyborg knight who wielded a plasma sword; Elara, an elven archer with a keen eye and a quiver of enchanted arrows; and Gizmo, a gnome inventor with an endless supply of gadgets and gizmos.

Together, they embarked on a perilous journey across the vast expanse of Gaianox, seeking the knowledge and artifacts necessary to repair the fractured world. Their quest led them through treacherous landscapes, from the scorching deserts of the Techno Wastes to the magical depths of the Enchanted Wilds.

Along the way, the team faced formidable challenges. They battled the fearsome Clockwork Behemoth, a towering mechanical beast that guarded the secrets of an ancient technomancer civilization. They navigated the perilous halls of the Arcane Archives, outwitting the enchanted traps that protected the repository of magical knowledge. And they braved the storms of the Elemental Expanse, a tempestuous region where the elemental forces of magic and technology clashed in a turbulent maelstrom.

Throughout their journey, Lyra and her companions grew stronger, honing their skills and forging unbreakable bonds of friendship. They discovered the power that lay within their unity, learning to blend magic and technology in ways never before imagined.

IV. The Nexus

After months of travel, the team arrived at their final destination: the Nexus, a convergence point where the realms of magic and technology were most closely intertwined. It was here that the Great Convergence had begun, and it was here that Lyra would fulfill her destiny.

The Nexus was a breathtaking sight, a swirling vortex of energy that crackled with the raw power of creation. As the team approached, they felt the familiar hum of the rift, the same resonant call that had first drawn Lyra to her quest.

The whispering shards had revealed one final secret: the key to reuniting the realms lay within the Nexus itself. But to access it, Lyra and her companions would have to overcome the Nexus Guardian, a being born of magic and technology, tasked with protecting the realms from the potential dangers of their reunion.

With a deep breath, Lyra stepped forward, her companions at her side. Together, they called upon the combined might of their magical and technological abilities, summoning a storm of arcane energy and technological prowess. The battle was fierce, with the Nexus Guardian testing the limits of their strength and cunning. But Lyra and her team were undeterred, their determination fueled by the knowledge that they fought for the fate of their world.

V. Reunification

As the final blow was struck, the Nexus Guardian fell, defeated. The barrier that separated the realms began to dissipate, and the vortex of energy at the heart of the Nexus pulsed with renewed vigor. Lyra approached the heart of the vortex, her allies standing watch as she prepared to complete the prophecy.

The whispering shards' voices filled her mind once more, guiding her as she called upon her technomancer powers. She reached out, her hands wreathed in a corona of magic and technology, and touched the heart of the Nexus.

A brilliant explosion of light erupted, washing over the world of Gaianox. As the light faded, the once-separated realms of magic and technology began to meld, merging into a seamless whole. The Cosmic Cascade shimmered in the sky, its light a testament to the unity that now existed.

In the days that followed, the people of Gaianox rejoiced, marveling at the new world that had been forged. The once-isolated realms were now united, their inhabitants free to explore and learn from one another. The age of exploration and discovery had begun, with Lyra and her companions at the forefront, their adventures only just beginning.

The Whispering Shards, now silent, stood as a testament to the heroics of Lyra and her friends, a reminder of the power of unity and the potential of a world where magic and technology existed in harmony. And as Gaianox embarked on this new chapter, the people looked to the future with hope, knowing that together, they could face any challenge that lay ahead.

Lyra and her companions were celebrated as heroes, their names etched into the annals of history. The village of Elmsmere became a thriving hub of innovation and magic, a symbol of the progress that could be achieved when the realms worked in unison.

The Great Convergence had changed the world, but it had also changed Lyra and her friends. They had discovered the depths of their own potential and the strength that came from their unity. They had learned that the realms of magic and technology were not opposing forces, but rather complementary aspects of a greater whole.

In the years that followed, Lyra and her companions continued to explore the wonders of their unified world. They delved into the mysteries of ancient technomancer ruins, uncovered the secrets of long-forgotten magical artifacts, and forged new alliances with the diverse inhabitants of Gaianox.

As the world evolved, so too did its heroes. Tarius, the cyborg knight, became a champion for peace, using his skills to mediate conflicts between the realms. Elara, the elven archer, founded an academy where young archers could master the art of combining enchanted arrows with advanced targeting systems. And Gizmo, the gnome inventor, opened a workshop where magic and technology were used in harmony to create wondrous new inventions.

Lyra, forever the bridge between realms, went on to become an ambassador for her world, traveling to distant lands and forging connections with other civilizations. She taught the lessons she had learned, spreading the message of unity and collaboration to all who would listen.

The legacy of the Whispering Shards lived on, a constant reminder that the power to change the world lay within each individual, waiting to be harnessed. And as the people of Gaianox looked to the stars, they knew that the future held infinite possibilities, for they had learned that together, they could accomplish anything. ''',
        image = 'https://i.ibb.co/m68KgMP/DALL-E-2023-04-14-13-16-39-Lyra-at-the-center-reaches-out-towards-the-swirling-vortex-of-the-Nexus-w.png'
    )
    story3 = Story(
        user_id = 1,
        title = 'demostory3',
        content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    )
    story4 = Story(
        user_id = 2,
        title = 'demostory4',
        content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    )
    story5 = Story(
        user_id = 3,
        title = 'demostory5',
        content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    )


    db.session.add(story1)
    db.session.add(story2)
    db.session.add(story3)
    db.session.add(story4)
    db.session.add(story5)
    db.session.commit()


def undo_story():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stories RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM story"))


    db.session.commit()
