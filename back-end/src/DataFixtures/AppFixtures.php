<?php

namespace App\DataFixtures;

use App\Entity\Hotel;
use App\Entity\Room;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);

        /** Ajouter un admin **/
        $admin = new User();
        $admin->setEmail('admin@admin.com');
        $admin-> setRoles(['ROLE_ADMIN']);
        $admin->setPassword('$2y$13$eLtsp6ZQl7hB93r9zcphqu3h3zAIQRtjWRSscBKakdWKbsuhqcFaG');
        $admin->setFirstName('AdminFirstName');
        $admin->setLastName('AdminLastName');
        $manager->persist($admin);

        /** Ajouter un manager **/
        $hotelManager = new User();
        $hotelManager->setEmail('manager@manager.com');
        $hotelManager-> setRoles(['ROLE_MANAGER']);
        $hotelManager->setPassword('$2y$13$dKWECakopTJTCT/QEeMMuOXSGtdnzrBWD.Hb94Q.XWDYTzFYD9v06');
        $hotelManager->setFirstName('ManagerFirstName');
        $hotelManager->setLastName('ManagerLastName');
        $manager->persist($hotelManager);

        /** Ajouter un hotel **/
        $hotel = new Hotel();
        $hotel->setName('Le premier Hôtel');
        $hotel-> setCity('Paris');
        $hotel->setAdress('35 rue des Coquelicots');
        $hotel->setDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
        $hotel->setStars(5);
        $hotel->setUser($hotelManager);
        $manager->persist($hotel);

        /** Ajouter un room **/
        $room = new Room();
        $room->setTitle('Chambre n°1 du premier hôtel');
        $room-> setDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
        $room->setPrice(100);
        $room->setImage('https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/loisirs/sorties/hotels/belles-chambres-d-hotel/76660985-1-fre-FR/Les-plus-belles-chambres-d-hotel-pour-une-nuit-de-Saint-Valentin-reussie.jpg');
        $room->setHotel($hotel);
        $manager->persist($room);

        /** Ajouter un user **/
        $user = new User();
        $user->setEmail('user@user.com');
        $user-> setRoles(['ROLE_USER']);
        $user->setPassword('$2y$13$Q4lDtbQs.PLvVOmnAQDswOrCYkOgB3GDGV7h9PW5ZDLjZnvChkbSS');
        $user->setFirstName('Jean');
        $user->setLastName('Reno');
        $manager->persist($user);

        $manager->flush();

        $manager->flush();
    }
}
