import create from "zustand";

interface MenuState {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  hideMenu: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  isMenuOpen: false,
  toggleMenu: () =>
    set((state: { isMenuOpen: boolean }) => ({
      isMenuOpen: !state.isMenuOpen,
    })),
  hideMenu: () => set(() => ({ isMenuOpen: false })),
}));
