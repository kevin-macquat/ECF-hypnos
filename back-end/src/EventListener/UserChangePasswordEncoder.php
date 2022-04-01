<?php

namespace App\EventListener;

use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserChangePasswordEncoder
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function preUpdate(User $user): void
    {
        if ($user->getPlainPassword() !== null) {
            $hashedPassword = $this->passwordHasher->hashPassword(
                $user,
                $user->getPlainPassword()
            );

            $user->setPassword($hashedPassword);
        }
    }
}
