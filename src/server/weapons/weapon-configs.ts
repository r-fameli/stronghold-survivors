export interface BaseWeaponConfig {
    COOLDOWN: number;
    DURATION: number;
    RADIUS: number;
}

export const TurretConfig: BaseWeaponConfig = {
    COOLDOWN: 2000,
    DURATION: 10000,
    RADIUS: 20,
};
